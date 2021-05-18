import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Rating } from '../interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {


  constructor(private afs: AngularFirestore) { }

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  // Get all stars that belong to a Movie
  getMovieStars(movieId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('movieId', '==', movieId) );
    return starsRef.valueChanges();
  }

  // Create or update star
  // setStar(userId, movieId, value, like, dislike) {
  //   const star: Rating = { userId, movieId, value, like, dislike };

  //   const starPath = `stars/${star.userId}_${star.movieId}`;

  //   return this.afs.doc(starPath).set(star);
  // }
}
