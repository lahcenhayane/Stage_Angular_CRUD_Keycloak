import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private keycloakService:KeycloakService,
              private router:Router){
    this.isLogin = this.keycloakService.getKeycloakInstance().authenticated;
  }

  username?:string = "";
  isLogin:any = false;

  ngOnInit(): void {
    if(this.isLogin){
      this.keycloakService.loadUserProfile()
          .then(data=>this.username = data.username)
          .catch(err=>console.log(err)
      )
    }
  }

  logout(){
    this.keycloakService.clearToken();
    this.keycloakService.logout();
    this.router.navigateByUrl("home")
  }

}
