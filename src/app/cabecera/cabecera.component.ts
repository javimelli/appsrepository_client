import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Headers } from '@angular/http';
import { CookiesService } from './../service/cookies.service';
import { SessionService } from './../service/session.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Globals } from './../app.global';


@Component({
  selector: 'cabecera',
  providers: [ Globals ],
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	private userSession = {"name": '', "id": 9999};
	private login = true;
	private user = false;
	private desplegado = false;

	constructor(private sessionService:SessionService, private cookiesService:CookiesService, private router: Router, private globals:Globals) {
		this.sessionService.getUserSession().subscribe(
			response => {
				if(response.status == 204){
					this.login = true;
					this.user = false;
				}
				else{
					this.userSession = response.json();
					if(response.status == 200 && this.userSession.name != ''){
						this.login = false;
						this.user = true;
						console.log(this.userSession);
					}
				}
			},
			error => {
				console.log(error);
				if(error.status == 401){
					//this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
					this.router.navigate(['/login']);
				}
			}
		);
	}

	ngOnInit() {
    	//this.getUserSession();
	}

	desplegar_dropdown(){
		if(this.desplegado == true)
			this.desplegado = false;
		else
			this.desplegado = true;
	}

	recojer_dropdown(){
		this.desplegado = false;
	}

	logOut(){
		this.sessionService.logOut().subscribe(
			response => {
				console.log(response.text());
				if(response.text() == 'true')
					window.location.replace(this.globals.HOST_CLIENTE);
			},
			error => {

			}
		);
	}



}
