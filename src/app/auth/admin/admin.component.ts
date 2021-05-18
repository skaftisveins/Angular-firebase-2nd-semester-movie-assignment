import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../../interfaces/user';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  registeredUsersCol: AngularFirestoreCollection<User>;
  registeredUsers$: Observable<User[]>;

  activeUsersCol: AngularFirestoreCollection<User>;
  activeUsers$: Observable<User[]>;

  bannedUsersCol: AngularFirestoreCollection<User>;
  bannedUsers$: Observable<User[]>;

  constructor(
    private afs: AngularFirestore,
    private firebaseService: FirebaseService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.registeredUsers();
  }

  registeredUsers() {
    this.activeUsersCol = this.afs.collection('users');
    this.activeUsers$ = this.activeUsersCol.valueChanges();
  }

  showActiveUsers() {
    this.activeUsersCol = this.afs.collection('users', ref => ref.where('status', '==', 'active'));
    this.activeUsers$ = this.activeUsersCol.valueChanges();
  }

  showBannedUsers() {
    this.bannedUsersCol = this.afs.collection('users', ref => ref.where('status', '==', 'banned'));
    this.bannedUsers$ = this.bannedUsersCol.valueChanges();
    console.log('showing banned users');
  }
}
