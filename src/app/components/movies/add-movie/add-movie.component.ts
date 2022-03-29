import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Author } from 'src/app/models/author.model';
import { MovieService } from 'src/app/services/movies.service';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  
  constructor(private _movieService: MovieService,
              private _toastr: ToastrService,
              private _route: Router) { }

  ngOnInit(): void {
  }

  movieForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    author: new FormGroup({
      name: new FormControl(null, [Validators.required])
    })
  });
  movie: Movie[] = [];
  errorsMovie?:any = "";

  urlImage?:any ="https://img1.freepng.fr/20171221/vlw/transparent-snowfall-png-picture-5a3bbbee9a1655.0539032915138641746312.jpg"
  changeImage(event:any){
    this.urlImage = event.target.value
  }

  addMovie(){
    this._movieService.createMovie(this.movieForm.value).subscribe(
      res => {
        this.movie = res
        this._toastr.success("Movie Added ", 'Add Success', { timeOut: 5000 })
        this._route.navigateByUrl("/movies")
      },
      error => {
        this.errorsMovie = error.error.errors
        this._toastr.error("Check Your Champs", 'Message Error', { timeOut: 3000 })
      }
    )
  }

}
