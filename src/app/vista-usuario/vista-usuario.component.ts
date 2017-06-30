import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './../service/app.service';
import { UserService } from './../service/user.service';
import { App_categoryService } from './../service/app_category.service';
import { App_PlatformService } from './../service/app_platform.service';
import { ImagesService } from './../service/images.service';
import { Globals } from './../app.global';
import { SessionService } from './../service/session.service';
import { Dataset_appService } from './../service/dataset_app.service';
import { Vote_appService } from './../service/vote_app.service';
import { CommentaryService } from './../service/commentary.service';
import { Vote_commentService } from './../service/vote_comment.service';
import { DataSetService } from './../service/dataset.service';

@Component({
  selector: 'app-vista-usuario',
  providers: [ Globals ],
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {

	private userId = 9999;

	private user = {
				"id": 9999,
				"name": '',
				"last_name1": '',
				"last_name2": '',
				"username": '',
				"tlf": '',
				"url_web": '',
				"email": '',
				"country": '',
				"url_foto": '',
				"password": '',
				"id_fotos": 9999,
				"foto": ''
			};

	private apps = [];
	private datasets = [];

  	constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService:AppService, private userService:UserService, private app_categoryService:App_categoryService, private app_PlatformService:App_PlatformService, private imagesService:ImagesService, private globals:Globals, private sessionService:SessionService, private dataset_appService:Dataset_appService, private vote_appService:Vote_appService, private commentaryService:CommentaryService, private vote_commentService:Vote_commentService, private dataSetService:DataSetService) {
  		this.userId = this.activatedRoute.snapshot.params['id'];
  		this.cargarDatos();
	}

	ngOnInit() {}

	
	public cargarDatos(){
		this.userService.getUserById(this.userId).subscribe(
			response => {
				this.user = response.json();
				console.log(this.user);
				this.imagesService.getImagesById_fotos(this.user.id_fotos).subscribe(
					response => {
						if(response.json().length > 0)
							this.user.foto = this.globals.HOST + response.json()[0].url;
							console.log("FTO: ",this.user.foto);
					},
					error => {
						console.log("FTO: ",this.user.foto);
					}
				);
				this.appService.getAppsByOwner(this.user.id).subscribe(
					response => {
						this.apps = response.json();
						console.log(this.apps);
					},
					error => {

					}
				);
				this.dataSetService.getDatasetsByIdUser(this.user.id).subscribe(
					response => {
						this.datasets = response.json();
						console.log(this.datasets);
					},
					error => {

					}
				);
			},
			error => {

			}
		);
	}

}
