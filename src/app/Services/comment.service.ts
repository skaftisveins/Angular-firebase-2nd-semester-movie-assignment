import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Comment } from '../interfaces/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  userId: string;

  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) { this.userId = user.uid; }
      });
    }

    getComments(movieId: string): Observable<any> {
      return this.firestore.collection('movie').doc(movieId).collection('comments').snapshotChanges();
    }

    createComment(movieId: string, comment: Comment): void {
      comment.authorId = this.userId;
      this.firestore.collection('movie').doc(`${movieId}`).ref.collection('comments').add(comment);
    }

    updateComment(movieId: string, commentId: string, comment: Comment): void {
      this.firestore.collection('movie').doc(`${movieId}`).ref.collection('comments').doc(commentId).update({message: comment.message});
    }

    deleteComment(movieId: string, commentId: string): void {
      this.firestore.collection('movie').doc(`${movieId}`).ref.collection('comments').doc(commentId).delete();
    }
}
