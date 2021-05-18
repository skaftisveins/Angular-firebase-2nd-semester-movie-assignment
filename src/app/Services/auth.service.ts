import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, first, tap } from 'rxjs/operators';
import { User, EmailPasswordCredentials } from '../interfaces/user';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  allUsers$: Observable<any>;
  testMovies: AngularFireList<any>;
  testMovies$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router
    ) {

    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(tap(x => {
            if (x.status === 'banned') {
              console.error('Sorry, this user is banned!');
              this.signOut();
            }
          }));
        } else {
          return of(null);
        }
      }));

    this.allUsers$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>('users').snapshotChanges();
          }
        })
      );

   }

   emailLogin() {
     const provider = new auth.EmailAuthProvider();
     return this.oAuthLogin(EmailPasswordCredentials);
   }

   googleLogin(user) {
     const provider = new auth.GoogleAuthProvider();
     return this.oAuthLogin(provider) && this.router.navigate(['/main']);
   }

   private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        console.log(credential);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    if (user) {
      return false;
    }
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      status: user.status,
      roles: {
        subscriber: true
       }
    };
    return userRef.set(data, { merge: true }); // update the user data in a non-destructive way
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/main']);
    });
  }

    ///// Role-based Authorization //////

    canRead(user: User): boolean {
      const allowed = ['admin', 'editor', 'subscriber'];
      return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
      const allowed = ['admin', 'editor'];
      return this.checkAuthorization(user, allowed);
    }

    canDelete(user: User): boolean {
      const allowed = ['admin'];
      return this.checkAuthorization(user, allowed);
    }

    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
      if (!user) { return false; }
      for (const role of allowedRoles) {
        if (user.roles[role] ) {
          return true;
        }
      }
      return false;
    }
  }
