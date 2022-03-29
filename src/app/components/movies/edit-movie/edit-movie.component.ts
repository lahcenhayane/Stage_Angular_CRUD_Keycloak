import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movies.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private _router:Router,
              private _movieService:MovieService,
              private activatedRoute:ActivatedRoute,
              private toastr:ToastrService) { }

  private idMovie: any = null

  ngOnInit(): void {
    this.idMovie = this.activatedRoute.snapshot.paramMap.get("id");
    this.getMovieByID()
    
  }

  movieForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      author: new FormGroup({
        name: new FormControl(null, [Validators.required])
      })
  })

  urlImage?:any =""
  changeImage(event:any){
    this.urlImage = event.target.value
  }


  getMovieByID(){
    this._movieService.getMovieByID(this.idMovie).subscribe(
      res => {
        this.movieForm.get("id")?.setValue(res.id),
        this.movieForm.get("title")?.setValue(res.title),
        this.urlImage = res.image,
        this.movieForm.get("image")?.setValue(res.image),
        this.movieForm.get("description")?.setValue(res.description),
        this.movieForm.controls["author"].get("id")?.setValue(res.author?.id)
        this.movieForm.controls["author"].get("name")?.setValue(res.author?.name)
      },
      err => {
        this.toastr.error(err.error.message, 'Message Error', { timeOut: 5000 })
        this._router.navigateByUrl("/movies")
      }
    )
  }


  errorsMovie?:any = "";
  editMovie(){
    this._movieService.editMovieByDI(this.idMovie, this.movieForm.value).subscribe(
      res => {
        this.toastr.success("Movie Edited ", 'Edit Success', { timeOut: 5000 })
        this._router.navigateByUrl("/movies")
      },
      error => {
        this.errorsMovie = error.error.errors
        this.toastr.error("Check Your Champs", 'Message Error', { timeOut: 3000 })
      }
    )
  }


}
