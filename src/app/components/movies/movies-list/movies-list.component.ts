import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  hasRoleAdmin:boolean = true

  constructor(private _movieService:MovieService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private toastr:ToastrService,
              private keycloak:KeycloakService) { 

    if (this.keycloak.getUserRoles().includes("ADMIN")) {
      this.hasRoleAdmin = true;
    }else{
      this.hasRoleAdmin = false;
    }
    
  }

  ngOnInit(): void {
    this.getAllMovies()
  }

  movies:Movie[] = []

  getAllMovies(){
    this._movieService.getAll().subscribe(
      res => this.movies = res,
      err => this.toastr.error(err.error.message, 'Authentication')
    )
  }

  showAndHideModalMovie:boolean = false

  idDeleteMovie:any;
  deleteMovie(id:any){
    this.showAndHideModalMovie = true;
    this.idDeleteMovie = id;
    console.log(this.idDeleteMovie);
  }

  confirmDeleteMovie(){
    console.log(this.idDeleteMovie);
    
    this._movieService.deleteMovieByID(this.idDeleteMovie).subscribe(
      () => {
        this.showAndHideModalMovie = false
        this.movies = this.movies.filter(data=>data.id != this.idDeleteMovie)
        //this.router.navigateByUrl("/movies")
        this.toastr.success("Delete Success.", 'Delete Success.')
        this.idDeleteMovie = null
      },
      err => console.log(err)
    )
  }

}
