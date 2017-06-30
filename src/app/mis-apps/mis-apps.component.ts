import { Component, OnInit } from '@angular/core';
import { SessionService } from './../service/session.service';
import { AppService } from './../service/app.service';

@Component({
  selector: 'app-mis-apps',
  templateUrl: './mis-apps.component.html',
  styleUrls: ['./mis-apps.component.css']
})
export class MisAppsComponent implements OnInit {

	private userSession = {"name": '', "id": 9999};

	private apps = [];

  	constructor(private sessionService:SessionService, private appService:AppService) {
  		this.sessionService.getUserSession().subscribe(
			response => {
				if(response.status != 204)//Este codigo da si el user o la pass son incorrectos.
				  this.userSession = response.json();
				else{
				}
				if(response.status == 200 && this.userSession.name != ''){//Comprobamos que la peticion es correcta y el user se completa
				  console.log(this.userSession);
				  this.cargarApps();
				  console.log(this.userSession);
				}
			},
				error => {
				console.log(error);
			}
		);
	}

  ngOnInit() {
  }

  public cargarApps(){
  	this.appService.getAppsByOwner(this.userSession.id).subscribe(
  		response => {
  			this.apps = response.json();
  			console.log(this.apps);
  		},
  		error => {

  		}
	);
  }

}
