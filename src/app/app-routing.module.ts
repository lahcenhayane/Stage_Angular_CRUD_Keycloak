import { IsAdminGuard } from './guards/is-admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAuthorsComponent } from './components/authors/list-authors/list-authors.component';
import { HomeComponent } from './components/home/home.component';
import { AddMovieComponent } from './components/movies/add-movie/add-movie.component';
import { EditMovieComponent } from './components/movies/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilUserComponent } from './components/users/profil-user/profil-user.component';
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'register', component: RegisterComponent, canActivate:[AfterAuthGuard] },

  { path: 'profil', component: ProfilUserComponent, canActivate:[AuthGuard] },

  { path: 'movies', component: MoviesListComponent, canActivate:[AuthGuard] },
  { path: 'movie/:id/detail', component: MovieDetailsComponent, canActivate:[AuthGuard] },
  { path: 'movie/add', component: AddMovieComponent, data:{ roles:"ADMIN"}, canActivate:[AuthGuard, IsAdminGuard] },
  { path: 'movie/:id/edit', component: EditMovieComponent, data:{ roles:"ADMIN"}, canActivate:[AuthGuard, IsAdminGuard] },

  { path: 'authors', component: ListAuthorsComponent, canActivate:[AuthGuard] },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }