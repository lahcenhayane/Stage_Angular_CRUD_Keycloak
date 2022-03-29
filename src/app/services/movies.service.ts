import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private keycloakService:KeycloakService) { }

  private readonly url:String = environment.url

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.url}/movies`)
  }

  getMovieByID(id:any) :Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/${id}`)
  }
 
  createMovie(movie:any):Observable<any>{
      return this.http.post<any>(`${this.url}/movie/`, movie);
  } 

  deleteMovieByID(id:any):Observable<Movie>{
    return this.http.delete(`${this.url}/movie/${id}`)
  }

  editMovieByDI(id:any, data:Movie): Observable<Movie>{
    return this.http.put(`${this.url}/movie/${id}`, data)
  }

}
