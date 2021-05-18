import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Movie } from '../interfaces/movie';
import { Rating } from '../interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getRating(movieId: number): Observable<any> {
    movieId = +movieId;
    if (movieId <= 0) {
      return;
    }

    // Get movie data and id
    return this.db.collection('movie').doc(`${movieId}`).snapshotChanges().pipe(
      map(x => {
        if (x.payload.exists === false) {
          const doc = { like: 0, dislike: 0 };
          this.db.collection('movie').doc(`${movieId}`).set(doc).then();
        }
        return x.payload.data();
      })
    );
  }

  setComment(movieId: number, user: User, message: string): void {
    const comment = { authorName: user.displayName, id: user.uid, message: (message), created: Date.now() };
    this.db.collection('movie').doc(`${movieId}`).ref.collection('comments').add(comment);
  }

  setFavorite(userId: string, movie: Movie): void {
    this.db.collection('users').doc(`${userId}`).ref.collection('favorites').doc(`${movie.id}`).set(movie);
    console.log(userId, movie);
  }

  getFavorites(userId: string): Observable<Movie[]> {
    console.log('retrieving');
    console.log(`${userId}`);
    return this.db.collection('users').doc(`${userId}`).collection<Movie>('favorites').valueChanges();
  }

  removeFavorite(userId: string, movieId: number): void {
    this.db.collection('users').doc(userId).ref.collection('favorites').doc(`${movieId}`).delete();
  }

  getAllUsers(userId: string): Observable<any> {
    console.log(userId);
    return this.db.collection('users').doc(userId).valueChanges();
  }

  setLikes(movie: Movie, like: boolean = true): void {
    const refDoc = this.db.doc(`movie/${movie.id}`).ref;

    refDoc.get().then(x => {
      // if (x.exists === false) {
        const current: Rating = (x.data() as Rating);
        if (like) {
          current.like++;
        } else {
          current.dislike++;
        }
        refDoc.update(current);
    });
  }

}
