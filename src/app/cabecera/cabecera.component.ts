import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Headers } from '@angular/http';
import { SessionService } from './../service/session.service';
import { CookiesService } from './../service/cookies.service';


@Component({
  selector: 'cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(private sessionService:SessionService, private cookiesService:CookiesService  ) { }

  ngOnInit() {
    //this.getUserSession();
  }

}
