import { KeycloakService } from 'keycloak-angular';
import { IsAdminGuard } from './../../../guards/is-admin.guard';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.css']
})
export class ListAuthorsComponent implements OnInit {
  hasRoleAdmin:boolean = true
  constructor(private _router:Router,
              private _activatedRouter:ActivatedRoute,
              private _authorService:AuthorsService,
              private _toastr:ToastrService,
              private keycloak:KeycloakService) { 

                if (this.keycloak.getUserRoles().includes("ADMIN")) {
                  this.hasRoleAdmin = true;
                }else{
                  this.hasRoleAdmin = false;
                }

  }

  ngOnInit(): void {
    this.getAllAuthors()
  }

  authors:Author[] = []

  getAllAuthors(){
    this._authorService.getAllAuthors().subscribe(
      res => this.authors = res,
      err => this._toastr.error(err.error.message, 'Authentication')
    )
  }


}
