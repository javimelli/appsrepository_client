import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpModule, JsonpModule, Headers } from '@angular/http';
import { AppService } from './../service/app.service';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit,AfterViewInit {
  
  private apps = [];

  constructor(private appservice:AppService) { }

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
