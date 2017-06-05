import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './../service/app.service';
import { UserService } from './../service/user.service';
import { App_categoryService } from './../service/app_category.service';

@Component({
  selector: 'app-app-detalle',
  templateUrl: './app-detalle.component.html',
  styleUrls: ['./app-detalle.component.css']
})
export class AppDetalleComponent implements OnInit {

	//Isd de la app
	private appId;

	//Modelo
	private app = {
		"id": 0,
		"user_id": 0,
		"url_web": "",
		"title": "",
		"description": "",
		"url_icon": "",
		"price": 0,
		"version": 0,
		"url_video": "",
		"language": "0",
		"country": "0",
		"id_fotos": ""
	}

	private owner = {
		"id": 9999,
		"name": "",
		"Last_name1": "",
		"Last_name2": "",
		"username": "",
		"tlf": "",
		"url_web": "",
		"email": "",
		"country": "",
		"url_foto": "",
		"password": ""
	}

	private categorias = [];

  	constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService:AppService, private userService:UserService, private app_categoryService:App_categoryService) {
  		this.appId = this.activatedRoute.snapshot.params['id'];
  		this.cargarDatos();
  		this.cargarCategorias();
	}

	ngOnInit() {
	}

	public cargarDatos(){
		//Cargamos los datos de la App
		this.appService.getAppsById(this.appId).subscribe(
			response => {
				//Controlar que el usuario registrado es el dueño de la noticia
				this.app = response.json();
				console.log(this.app);
				this.cargarOwner();
			},
			error => {
				console.log("ERROR en la carga de la app");
			}
		);
	}

	public cargarOwner(){
		this.userService.getUserById(this.app.user_id).subscribe(
			response => {
				this.owner = response.json();
			},
			error => {

			}
		);
	}

	public cargarCategorias(){
		this.app_categoryService.getApp_categorysByApp(this.app.id).subscribe(
			response => {
				this.categorias = response.json();
				console.log(this.categorias);
			},
			error => {

			}
		);
	}

}
