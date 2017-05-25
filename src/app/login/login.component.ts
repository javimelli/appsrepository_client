import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Headers } from '@angular/http';
import { SessionService } from './../service/session.service';
import { CookiesService } from './../service/cookies.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Globals } from './../app.global';

@Component({
  selector: 'login',
  providers: [ Globals ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username:string;
  private password:string;
  public user = {};
  private acepto = false;
  private msgTerminos = true;
  private msgIncorrecto = true;

  constructor(private sessionService:SessionService, private router: Router, private globals:Globals) { }

  ngOnInit() {
  }

  public login() {
  	let user = { username:this.username, password:this.password };
    	this.sessionService.startLogin(user).subscribe(
    		response => {
          console.log(response);
          if(response.status == 200){
            this.user = response.json();
            console.log(this.user);
            window.location.replace(this.globals.HOST_CLIENTE);
            //this.router.navigate(['/']);
          }
          if(response.status == 204){
            this.msgIncorrecto = false;
          }  
    		},
    		error => {

    		}
  	  );
  }

  public getUserSession(){
    this.sessionService.getUserSession().subscribe(
      response => {
        console.log(response);
        if(response.status == 200)   
          this.user = response.json();
        console.log(this.user);
      },
      error => {

      }
    );
  }

  public setUserSession(){
    let user = { username:this.username, password:this.password };

    this.sessionService.getUserSessionServlet(user).subscribe(
      response => {
        console.log(response);
        //this.cookiesService.set_cookie('prueva','true',2);
      },
      error => {

      }
    );
  }

  public logOut(){
    this.sessionService.logOut().subscribe(
      response => {
        console.log(response);
      },
      error => {

      }
    );
  }

}
