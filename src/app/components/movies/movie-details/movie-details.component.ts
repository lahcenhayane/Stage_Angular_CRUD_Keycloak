import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movies.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  hasRoleAdmin:boolean = true
  constructor(private keycloak:KeycloakService, private movieService:MovieService, private router:Router, private activatedRoute: ActivatedRoute, private toastr:ToastrService) { 
    if (this.keycloak.getUserRoles().includes("ADMIN")) {
      this.hasRoleAdmin = true;
    }else{
      this.hasRoleAdmin = false;
    }
   }
  
  id:any;
  
  movie:Movie = {
    id : null,
    title : '',
    image : '',
    description : '',
    author : {
      id:null,
      name:''
    }
  }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.getMovie()
  }

  getMovie(){
    this.movieService.getMovieByID(this.id).subscribe(
      res => this.movie = res,
      err => {
        this.toastr.error(err.error.message, 'Message Error', { timeOut: 5000 })
        this.router.navigateByUrl("/movies")
      }
      
    )
  }



  showAndHideModalMovie:boolean = true
  deleteMovieByID(id:any){
    this.movieService.deleteMovieByID(id).subscribe(
      () => {
        this.showAndHideModalMovie = false
        this.router.navigateByUrl("/movies")
        this.toastr.success("Delete Success.", 'Delete Success.')
      },
      err => console.log(err)
    )
  }

}
