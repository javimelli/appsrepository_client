import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpModule, JsonpModule, Headers } from '@angular/http';
import { AppService } from './../service/app.service';
import { SessionService } from './../service/session.service';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit,AfterViewInit {
  
  private apps = [];

  private userSession = {"name": ''};
  private user:boolean = false;

  constructor(private appservice:AppService, private sessionService:SessionService) { 
    this.sessionService.getUserSession().subscribe(
      response => {
        if(response.status != 204)
          this.userSession = response.json();
        if(response.status == 200 && this.userSession.name != ''){
          console.log(this.userSession);
          this.user = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnChanges(){}

  ngOnInit() {
  	this.getApps();
  }

  ngAfterViewInit(){
  	console.log('ngAfterViewInit');
  }

  public getApps() {
  	this.appservice.getApps().subscribe(
  		response => {
  			console.log(response.json());
  			this.apps = response.json();
  			console.log(this.apps);
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

}
