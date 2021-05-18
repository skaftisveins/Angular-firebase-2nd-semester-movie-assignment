import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './themoviedb/main/main.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { MovieDetailComponent } from './themoviedb/movie-detail/movie-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './auth/user/user.component';
import { GenrePipe } from './pipes/genre.pipe';
import { LogPipe } from './pipes/log.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MovieRatingComponent } from './themoviedb/movie-rating/movie-rating.component';
import { AdminComponent } from './auth/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MovieDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    GenrePipe,
    LogPipe,
    SearchPipe,
    SafeHtmlPipe,
    SafeResourceUrlPipe,
    DateFormatPipe,
    MovieRatingComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app
    AngularFireDatabaseModule,
    AngularFirestoreModule, // import firebase/firestore, database features
    AngularFireAuthModule, // imports firebase/auth, auth features
    AngularFireStorageModule // imports firebase/storage, storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
