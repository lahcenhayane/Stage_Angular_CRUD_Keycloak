import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initialize } from './keycload.init';
import { ToastrModule } from 'ngx-toastr';
import { AddMovieComponent } from './components/movies/add-movie/add-movie.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditMovieComponent } from './components/movies/edit-movie/edit-movie.component';
import { HomeComponent } from './components/home/home.component';
import { ListAuthorsComponent } from './components/authors/list-authors/list-authors.component';

import { ProfilUserComponent } from './components/users/profil-user/profil-user.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    AddMovieComponent,
    MovieDetailsComponent,
    MoviesListComponent,
    EditMovieComponent,
    HomeComponent,
    ListAuthorsComponent,
    ProfilUserComponent,
    RegisterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
