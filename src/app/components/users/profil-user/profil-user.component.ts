import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  constructor(private _keycloakService:KeycloakService) { }

  user?:any = {
    username:null,
    firstName:null,
    lastName:null,
    email:null,
    enabled:null,
    createdTimestamp:null,
  }

  ngOnInit(): void {
    this.getInfoUser()
  }

  getInfoUser(){
    this._keycloakService.loadUserProfile()
        .then(data => {
          this.user.username = data.username,
          this.user.firstName = data.firstName,
          this.user.lastName = data.lastName,
          this.user.email = data.email,
          this.user.enabled = data.enabled,
          this.user.createdTimestamp = data.createdTimestamp
        })
        .catch(err => console.log(err)
    )
  }

}
