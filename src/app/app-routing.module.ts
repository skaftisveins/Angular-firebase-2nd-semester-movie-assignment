import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './themoviedb/main/main.component';
import { MovieDetailComponent } from './themoviedb/movie-detail/movie-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './auth/user/user.component';
import { AdminComponent } from './auth/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, data: { page: 'main' } },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'page/:main', component: MainComponent },
  { path: 'top-rated/:main', component: MainComponent },
  { path: 'detail/:movie', component: MovieDetailComponent, data: { page: 'detail' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
