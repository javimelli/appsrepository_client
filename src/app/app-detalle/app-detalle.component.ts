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

@Component({
  selector: 'app-app-detalle',
  providers: [ Globals ],
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
		"id_fotos": "",
		"date": "",
		"time": "",
		"visitas": 0,
		"visits": 0
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
		"password": "",
	}

	private comentario = {
		"user_id": 9999,
		"app_id": 9999,
		"date": "",
		"time": "",
		"text": "",
		"url_img": ''
	}

	//Usuario de sesión
	private userSession = {"name": '', "id": 9999};
  	private user:boolean = false;

	private voto = {
		"app_id": this.appId,
		"complaint": false,
		"user_id": this.userSession.id,
		"value": 9999
	}

	//Arrays para guardar la infomacion de la app
	private categorias = [];
	private plataformas = [];
	private capturas = [];
	private datasets = [];
	private comentarios = [];

  	//Propiedades para gestionar el voto
  	private votos = [];
  	private idsAppsVotadas = [];
  	private hayVoto = false;
  	private votada = true;
  	private actualizada = true;

  	constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService:AppService, private userService:UserService, private app_categoryService:App_categoryService, private app_PlatformService:App_PlatformService, private imagesService:ImagesService, private globals:Globals, private sessionService:SessionService, private dataset_appService:Dataset_appService, private vote_appService:Vote_appService, private commentaryService:CommentaryService, private vote_commentService:Vote_commentService) {
  		this.appId = this.activatedRoute.snapshot.params['id'];
  		//Comprobamos la session
  		this.sessionService.getUserSession().subscribe(
			response => {
				if(response.status != 204)//Este codigo da si el user o la pass son incorrectos.
				  this.userSession = response.json();
				else{
				}
				if(response.status == 200 && this.userSession.name != ''){//Comprobamos que la peticion es correcta y el user se completa
				  console.log(this.userSession);
				  this.compribarSiHayVoto();
				  console.log(this.userSession);
				  this.user = true;
				}
			},
				error => {
				console.log(error);
			}
		);
	}

	ngOnInit() {this.cargarDatos();}

	public cargarDatos(){
		//Cargamos los datos de la App
		this.appService.getAppsById(this.appId).subscribe(
			response => {
				//Controlar que el usuario registrado es el dueño de la noticia
				this.app = response.json();
				console.log(this.app);
				this.cargarOwner();
				this.cargarCategorias();
				this.cargarPlatafromas();
				this.cargarCapturas();
				this.cargarDatasets();
				this.cargarComentarios();

				//Sumamos la visita
				this.app.visitas = this.app.visitas + 1;
				this.appService.putApp(this.app, this.app.id).subscribe(
					response => {
						console.log("NUEVA VISITA: "+response.json());
						console.log("VISITAS APP: "+this.app.visitas);
					},
					error => {

					}
				);
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
				console.log(this.owner);
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

	public cargarPlatafromas(){
		this.app_PlatformService.getApp_platformByApp(this.app.id).subscribe(
			response => {
				this.plataformas = response.json();
				console.log(this.plataformas);
			},	
			error => {

			}
		);
	}

	public cargarCapturas(){
		this.imagesService.getImagesById_fotos(this.app.id_fotos).subscribe(
			response => {
				this.capturas = response.json();
				let borrar;
				console.log(this.capturas);
				for(let i=0; i<this.capturas.length; i++){
					this.capturas[i].url_thumbnail = this.globals.HOST + this.capturas[i].url;
					if(this.capturas[i].type == "icon"){
						borrar = i;
					}
				}
				this.capturas.splice(borrar,1);
				console.log(this.capturas);
			},
			error => {

			}
		);
	}

	public cargarDatasets(){
		this.dataset_appService.getDataset_appByApp(this.app.id).subscribe(
			response => {
				this.datasets = response.json();
				console.log("DATASETS: ",this.datasets);
			},
			error => {

			}
		);
	}

	public cargarComentarios(){
		this.commentaryService.getCommentsByApp(this.appId).subscribe(
			response => {
				this.comentarios = response.json();
				console.log("COMENTARIOS: ",this.comentarios);
				for(let i=0; i<this.comentarios.length; i++){
					this.userService.getUserById(this.comentarios[i].user_id).subscribe(
						response => {
							let user = response.json();
							this.comentarios[i].username = response.json().username;
							this.comentarios[i].editor = false;
							this.comentarios[i].editar = true;
							this.imagesService.getImagesById_fotos(user.id_fotos).subscribe(
								response => {
									console.log("RESPONSE:",response.json());
									let image:any = response.json();
									console.log("IMAGE:",image);
									if(image.length > 0)
										this.comentarios[i].url_img = this.globals.HOST + image[0].url;
									else
										this.comentarios[i].url_img = "../assets/Login.PNG";
									console.log("URL:",this.globals.HOST + image.url);
								},
								error => {
									console.log("IMAGE:");
									this.comentarios[i].url_img = "../assets/Login.PNG";
								}
							);
							if((this.userSession.name != '') && (this.userSession.id == this.comentarios[i].user_id)){
								this.comentarios[i].editor = true;	
							}
						},
						error => {

						}
					);
					this.vote_commentService.getVotosPositivosByComment(this.comentarios[i].id).subscribe(
						response => {
							this.comentarios[i].positive = response.json();
						},
						error => {

						}
					);
					this.vote_commentService.getVotosNegativosByComment(this.comentarios[i].id).subscribe(
						response => {
							this.comentarios[i].negative = response.json();
						},
						error => {

						}
					);
				}
				console.log("COMENTARIOS A EDITAR: ",this.comentarios);
			},
			error => {

			}
		);
	}

	public compribarSiHayVoto(){
		this.vote_appService.getVoteByUser(this.userSession.id).subscribe(
			response => {
				this.votos = response.json();
				console.log("VOTOS: ",this.votos);
				for(let i=0; i<this.votos.length; i++){
					if(this.votos[i].app_id == this.appId){
						this.voto = this.votos[i];
						this.hayVoto = true;
						console.log("VOTO:",this.voto);
					}
				}
			},
			error => {

			}
		);
	}

	public votar(){
		this.voto.app_id = this.appId;
		this.voto.complaint = false;
		this.voto.user_id = this.userSession.id;
		console.log(this.voto.value);
		if(this.userSession.name != ""){
			if(this.hayVoto == true){
				//hacemos put
				this.vote_appService.putVoteApp(this.voto, this.userSession.id, this.appId).subscribe(
					response => {
							this.votada = true;
							this.actualizada = false;
					},
					error => {

					}
				);
			}else{	
				//Hacemos post
				this.vote_appService.postVoteApp(this.voto).subscribe(
					response => {
							this.actualizada = true;
							this.votada = false;
							this.hayVoto = true;
					},
					error => {

					}
				);
			}
		}
	}

	public enviarComentario(){

		this.comentario.user_id = this.userSession.id;
		this.comentario.app_id = this.appId;

		this.commentaryService.postCommentary(this.comentario).subscribe(
			response => {
				this.comentario.text = "";
				this.cargarComentarios();
			},
			error => {
			}
		);
		
	}

	public editarCommentario(comentario){
		comentario.editar = false;
	}

	public actualizarComentario(comentario){
		this.commentaryService.putCommentary(comentario).subscribe(
			response => {
				comentario.editar = true;
				this.cargarComentarios();	
			},
			error => {
			}
		);
	}

	public borrarComentario(id){
		console.log("BORRAE:"+id);
		this.commentaryService.deleteCommentary(id).subscribe(
			response => {
				this.cargarComentarios();
			},
			error => {

			}
		);
	}

	public votarComentario(idComment,value){
		let hayVoto:any;
		let vote_comment = {
			"user_id": this.userSession.id,
			"commentary_id": idComment,
			"value": false,
			"complaint": false
		}
		this.vote_commentService.getByUserComment(this.userSession.id, idComment).subscribe(
			response => {
				hayVoto = response.json();
				if(hayVoto == null){
					console.log("HAY VOTO: ",hayVoto);
					//Insertamos voto
					if(value == 1){
						vote_comment.value = true; 
					}else{
						vote_comment.value = false;
					}
					this.vote_commentService.postVote_comment(vote_comment).subscribe(
						response => {
							this.cargarComentarios();
						},
						error => {

						}
					);
				}else{
					//Actualizamos voto
					if(value == 1){
						vote_comment.value = true; 
					}else{
						vote_comment.value = false;
					}
					this.vote_commentService.putVote_comment(this.userSession.id, idComment, vote_comment).subscribe(
						response => {
							this.cargarComentarios();
						},
						error => {

						}
					);
				}
			},
			error => {

			}
		);
	}

}
