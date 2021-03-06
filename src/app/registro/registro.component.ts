import { Component, OnInit } from '@angular/core';
import { UploadFiles } from './../service/upload.service';
import { Globals } from './../app.global';
import { ImagesService } from './../service/images.service';
import { UserService } from './../service/user.service';
import { SessionService } from './../service/session.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-registro',
  providers: [ Globals ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	private id_fotos;

	//Guardaremos las imágenes que se suban
	private imagenes = [];

	private url = "";

	private subida = false;
	private msgCorrecto = true;

	private aceptaCondiciones = false;
	private obligatorios = true;

	private file:any = '';//Guardaremos el array de files que se carguen en el input
	/*
		Guardaremos el file que queremos subir en este objeto FormData propio de javascript
		que es como se espera recibir en el servidor. Del tipo MediaType.MULTIPART_FORMDATA.
	*/
	private formData = new FormData();

	private user = {
		"name": "",
		"last_name1": "",
		"last_name2": "",
		"username": "",
		"tlf": "",
		"url_web": "",
		"email": "",
		"country": "",
		"url_foto": "",
		"password": "",
		"id_fotos": ""
	}

	constructor(private uploadFiles:UploadFiles, private globals:Globals, private imagesService:ImagesService, private userService:UserService, private router: Router, private sessionService:SessionService) { 
		//Creamos el numero aleatorio para las fotogtradias
		var aleatorio = Math.round(Math.random() * (9999 - 1000) + 1000);
		var date = new Date();
		this.id_fotos = date.getDate()+"_"+date.getMonth()+"_"+date.getFullYear()+"_"+date.getHours()+"_"+date.getMinutes()+"_"+date.getSeconds()+"_"+aleatorio;
		this.user.id_fotos = this.id_fotos;
		console.log(this.user.id_fotos);
	}

	ngOnInit() {
		this.cargarPaises();
	}

	public cargarPaises(){
		$.getJSON("../../assets/JSON/paises.json", function(datos) {
		    //console.log(datos);
		    $('#pais').append('<option value="0">Selecciona un país</option>');
		    $.each(datos, function(idx,nombre) {
		        //console.log("País: " + nombre);
		        $('#pais').append('<option value="'+nombre+'">'+nombre+'</option>');
		    });
		});
	}

	/*
		Método que se ejecutará cuando se produzca el evento change en el input
		de tipo file con id icono. Es devir cuando el usuario cargue un fichero
		en el input. Recibe el propio objeto evento change por parámetro.
	*/
	public onChange(event){
		console.log("onUpload");
		console.log(event);
		/*
		 Asignamos a la variable files el array de ficheros cargados en el
		 input file en el que se ha producido el evento change.
		*/
		this.file = event.srcElement.files;
		console.log("FILES: ",this.file);
	}

	

	/*
		Método que se ejecutará cuando se produzca el evento click sobre el botón
		de subir. En este método se realizará la petición ajax para subir la imagen.
	*/
	public upload(){
		console.log("Subir imagen");
		console.log(this.formData);
		/*
			Asignamos a la variable formData el name que se va a recibir en el servidor,
			por tanto el que tenemos que indicar en los parámetros de entrada con la
			anotación @FormDataParam y le añadimos la imagen subida en el input por el
			usuario.
		*/
		if(this.file != ''){
		  this.formData.append("file", this.file[0]);
		  //console.log(this.file);
		  /*
	 	 	Realizamos la petición ajax mediante el servicio uploadFiles pasandole el
		  	objeto formData que contienes la imagen y el texto que se le pasará como
		  	parámetro por la url.
		  */
			this.uploadFiles.uploadFiles(this.formData,'user',this.user.id_fotos).subscribe(
				response => {
				  	console.log(response);
	      			let url = "";
		      		url = response.text();
		      		//Cambiamos las barras '\' por barras '/' por si el directorio viene de windows
		      		url = url.replace(/\\/g, "/");
		      		//this.url = this.globals.HOST + this.url;
	      			this.subida = true;
	      			this.msgCorrecto = false;
		     		this.imagesService.postImages({
	       			 	"id_fotos": this.user.id_fotos,
	        			"url": url,
		        		"type": 'user'
		      		}).subscribe(
		        		response => {
		          			console.log(response.text());
		          			this.imagenes.push({"url": this.globals.HOST + url, "id": response.text(), "urlServer": url});
		      				console.log("IMÁGENES:",this.imagenes);
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

	public eliminarImage(url, id){
		this.imagesService.deleteImages(id).subscribe(
			response => {
				this.subida = false;
			},
			error => {
				console.log("ERROR en el borrado de la imagen");
			}
		);
		//let urlDelete = url.replace(/\//g,"\\");
		console.log(url);
		this.uploadFiles.deleteFiles(url).subscribe(
			response => {
				console.log("Imagen eliminada");
			},
			error => {
				console.log("");
			}  
		);
		this.imagenes.splice(0,1);
		this.msgCorrecto = true;	
	}

	public darDeAlta(){
		if(this.user.name == ""){
			this.obligatorios = false;
		}
		if(this.user.last_name1 == ""){
			this.obligatorios = false;
		}
		if(this.user.last_name2 == ""){
			this.obligatorios = false;
		}
		if(this.user.username == ""){
			this.obligatorios = false;
		}
		if(this.user.email == ""){
			this.obligatorios = false;
		}
		if(this.user.country == ""){
			this.obligatorios = false;
		}
		if(this.user.password == ""){
			this.obligatorios = false;
		}

		if(this.user.name != "" && this.user.last_name1 != "" && this.user.last_name2 != "" && this.user.username != ""
			&& this.user.email != "" && this.user.country != "" && this.user.password != ""){
			this.obligatorios = true;
		}

		if(this.obligatorios == true && this.aceptaCondiciones == true){
			//Insertamos
			this.userService.postUser(this.user).subscribe(
				response => {
					this.router.navigate(['/login']);
				},
				error => {

				}
			);
		}
	}


}
