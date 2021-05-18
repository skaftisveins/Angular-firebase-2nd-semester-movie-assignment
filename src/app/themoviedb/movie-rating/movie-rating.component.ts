import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent implements OnInit {

  userDoc: AngularFirestoreDocument<any>;
  movieDoc: AngularFirestoreDocument<any>;

  movieRating: Observable<any>;
  userRating: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.userDoc = this.afs.doc('ratings');
    this.movieDoc = this.afs.doc('movies');

    this.movieRating = this.movieDoc.valueChanges();
    this.userRating = this.userDoc.valueChanges();
  }

  get movieId() {
    return this.movieDoc.ref.id;
  }

  get userId() {
    return this.userDoc.ref.id;
  }

}
