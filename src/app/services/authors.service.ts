import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http:HttpClient) { }

  private readonly url:string = environment.url


  getAllAuthors():Observable<Author[]>{
    return this.http.get<Author[]>(`${this.url}/authors`)
  }

  getAuthorByID(id:any):Observable<Author>{
    return this.http.get<Author>(`${this.url}/author/${id}`)
  }

  createNewAuthor(author:Author):Observable<Author>{
    return this.http.post<Author>(`${this.url}/author`, author)
  }

  deleteAuthorByID(id:any):Observable<Author>{
    return this.http.delete<Author>(`${this.url}/author/${id}`)
  }

  updateAuthorByID(id:any, data:Author):Observable<Author>{
    return this.http.put<Author>(`${this.url}/author/${id}`, data)
  }

}
