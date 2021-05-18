import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private location: Location) { }

    googleLogin() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signOut() {
      this.afAuth.auth.signOut().then(() =>
        this.router.navigate(['/main']));
      }

  ngOnInit() {
  }



  goBack() {
    this.location.back();
  }

  // tryRegister(value) {
  //   this.auth.doRegister(value)
  //   .then(res => {
  //     console.log(res);
  //     this.errorMessage = "";
  //     this.successMessage = "Your account has been created";
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     this.successMessage = "";
  //   }
  //   })
}
