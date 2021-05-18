import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Movie } from 'src/app/interfaces/movie';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { AuthService } from 'src/app/Services/auth.service';
import { DataService } from 'src/app/data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('fadeInFavMovies', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *',
      animate(800)),
    ])
  ]
})
export class UserComponent implements OnInit {
  userFavMoviesCol: AngularFirestoreCollection<Movie>;
  userFavMovies$: Observable<Movie[]>;

  myFavMovies$: Observable<any>;
  user$: Observable<any>;
  user: any;
  private privUser: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private location: Location,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private data: DataService
    ) { }

  ngOnInit() {
    this.user$ = this.authService.afAuth.authState.pipe(tap(user => {
      if (user && !this.privUser) {
        this.privUser = user;
        this.myFavMovies$ = this.firebaseService.getFavorites(user.uid).pipe(tap(console.log));
      } else {
        this.privUser = null;
        this.myFavMovies$ = null;
      }
    }));
  }

  userFavMovies() {
    this.userFavMoviesCol = this.afs.collection('users');
    this.userFavMovies$ = this.userFavMoviesCol.valueChanges();
    // this.userFavMoviesCol = this.afs.collection('users').doc(userId).collection<Movie>('favorites').valueChanges();
    // this.userFavMoviesCol = this.afs.collection('users').doc(userId).collection<Movie>('favorites').doc(`${movie.id}`);

  }

  goBack() {
    this.location.back();
  }
}
