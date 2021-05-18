import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Observable} from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { CommentService } from 'src/app/Services/comment.service';
import { Comment } from '../../interfaces/comment';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Movie } from 'src/app/interfaces/movie';
import { User } from 'src/app/interfaces/user';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RatingService } from '../../Services/rating.service';
import { Rating } from '../../interfaces/rating';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))])
  ]
})
export class MovieDetailComponent implements OnInit {

  movie$: Observable<any>;
  video$: Observable<any>;
  comments$: Observable<any>;
  ratings$: Observable<any>;
  avgRating$: Observable<any>;
  user$: Observable<any>;
  movieId: number;
  selectedGenre: string;
  form: FormGroup;
  editForm: FormGroup;
  commentToEdit: Comment;
  bounce: any;
  currentRate = 8;
  hideTrailer = false;
  editState = false;
  selectedMovieGenresList = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private data: DataService,
    private commentService: CommentService,
    private afs: AngularFirestore,
    private firebaseService: FirebaseService,
    private auth: AuthService,
    private fb: FormBuilder,
    private ratingService: RatingService) { }

  ngOnInit() {
    this.movieId = +this.route.snapshot.paramMap.get('movie');
    this.ratings$ = this.firebaseService.getRating(this.movieId); // now it's a function (ratings$ observable)
    this.form = this.fb.group({
      message: [null, Validators.minLength(4)]
    });
    this.editForm = this.fb.group({
      message: [null]
    });
    this.getMovie();
    this.getComments();
  }

  getMovie(): void {
    this.movie$ = this.data.getMovie(this.movieId).pipe(tap(console.log)); // movie variable is passed to DataService getMovie
  }

  getComments() {
    this.comments$ = this.commentService.getComments(`${this.movieId}`).pipe(
      map(data => data.map(e => {
        return {
          cid: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })));
    }

  onPostComment(movieId, comment: Comment): void {
    this.auth.user$.pipe(first()).toPromise().then(x => {
      if (x && this.form.valid) {
        this.firebaseService.setComment(this.movieId, x, this.form.get('message').value);
        }
      this.form.reset();
    });
  }

  onDeleteComment(movieId: string, commentId: string): void {
    // this.clearState();
    this.auth.user$.pipe(first()).toPromise().then(x => {
      this.commentService.deleteComment(movieId, commentId);
      console.log('deleting comment..');
    });
  }

  onEditComment(movieId, comment: Comment): void {
    this.editState = true;
    this.commentToEdit = comment;
  }

  // onUpdateComment(comment: Comment) {
  //   this.firebaseService.updateComment(this.movieId, comment);
  //   this.clearState();
  // }

  onSelected(x: any): void {
    this.showTrailer();
    this.video$ = this.data.getVideo(x.id)
    .pipe(map(xTrailer => {
        if (xTrailer.results.length > 0) {
           return xTrailer.results.map(y => `https://www.youtube.com/embed/${y.key}?autoplay=1&mute=0`)[0];
        }
        })
      );
  }

  addMovieToFav(userId: string, movieId): void {
    this.firebaseService.setFavorite(userId, movieId);
    console.log('adding movie to user favorites');
  }

  showMyFavMovies(userId: string): void {
    this.firebaseService.getFavorites(userId);
    this.router.navigate(['/user']);
    console.log('show my fav movies');
  }

  removeMovieFromFav(userId: string, movieId): void {
    this.firebaseService.removeFavorite(userId, movieId);
    console.log('removing movie from user favorites');
  }

  // onPostComment(movieId, comment: Comment): void {
  //   this.auth.user$.pipe(first()).toPromise().then(x => {
  //     if (x && this.form.valid) {
  //       this.firebaseService.setComment(this.movieId, x, this.form.get('message').value);
  //       }
  //     this.form.reset();
  //   });
  // }

  // giveThumbsUpVote(userId: string, movieId, vote: Rating): void {
  //   this.auth.user$.pipe(first()).toPromise().then(x => {
  //     if (vote.like) {
  //       vote.like++;
  //     } else if (vote.dislike) {
  //       vote.dislike++;
  //       console.log(userId, movieId, vote);
  //     }
  //   });
  //   this.firebaseService.setLikes(userId, movieId, vote);
  // }

  giveThumbsUpVote(movie): void {
    this.firebaseService.setLikes(movie);
  }

  giveThumbsDownVote(movie): void {
    this.firebaseService.setLikes(movie, false);
  }

  goBack() {
    this.location.back();
  }

  showTrailer() {
    this.hideTrailer = !this.hideTrailer;
  }

  onSelectGenre(selected: string): void {
    this.selectedGenre = selected;
  }

  clearState() {
    this.editState = false;
    this.commentToEdit = null;
  }

  myFavMovieToggle() {
    this.bounce = !this.bounce;
  }

}

