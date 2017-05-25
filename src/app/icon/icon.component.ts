import { Component, OnInit, Input, Inject } from '@angular/core';
import { UploadFiles } from './../service/upload.service';
import { Globals } from './../app.global';
import { ImagesService } from './../service/images.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'icon',
  providers: [ Globals ],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  private file:any = '';//Guardaremos el array de files que se carguen en el input
  /*
    Guardaremos el file que queremos subir en este objeto FormData propio de javascript
    que es como se espera recibir en el servidor. Del tipo MediaType.MULTIPART_FORMDATA.
  */
  private formData = new FormData();
  /*
    Variable que desactivará los botones cuando se produaca una subida al servidor.
  */
  private subida:boolean = false;

  private url = "";

  private clases = {
    "msgCorrecto": true,
    "btnEliminar": true,
    "thumbnail": true
  }

  @Input()
  private idFotos: string;

  private images = [];//Guardamos las imágenes

  private icono = {"id": 0, "url": ""};

  ngOnChanges() {
    // changes.prop contains the old and the new value...
    if(this.idFotos != ''){
      this.imagesService.getImagesById_fotos(this.idFotos).subscribe(
        response => {
          this.images = response.json();
          if(this.images.length > 0){
            console.log("Desde OnChanges icon: ",this.idFotos);
            console.log("Desde OnChanges icon: ",this.images);
            if(this.images.length != 0){
              for(let i=0; i<this.images.length; i++){
                if(this.images[i].type == "icon"){
                    this.clases.thumbnail = false;
                    this.subida = true;
                    this.url = this.globals.HOST + this.images[i].url;
                    this.icono = this.images[i];
                }
              }
            }
          }
        },
        error => {

        }
      );
    }
  }

  constructor(private uploadFiles:UploadFiles, private globals:Globals, private imagesService:ImagesService) { }

  ngOnInit() {
    console.log("Desde OnInit icon: ",this.idFotos);
    console.log("Desde OnInit icon: ",this.images);
  }

  /*
  	Método que se ejecutará cuando se produzca el evento change en el input
  	de tipo file con id icono. Es devir cuando el usuario cargue un fichero
  	en el input. Recibe el propio objeto evento change por parámetro.
  */
  onChange(event){
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
  upload(){
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
    	this.uploadFiles.uploadFiles(this.formData,'icon',this.idFotos).subscribe(
    		response => {
    		  console.log(response);
          let url = "";
          url = response.text();
          //Cambiamos las barras '\' por barras '/' por si el directorio viene de windows
          this.icono.url = url;
          url = url.replace(/\\/g, "/");
          this.url = this.globals.HOST + url;
          //this.url = this.globals.HOST + this.url;
          console.log(this.url);
          this.subida = true;
          this.clases.msgCorrecto = false;
          this.clases.thumbnail = false;
          this.imagesService.postImages({
            "id_fotos": this.idFotos,
            "url": url,
            "type": 'icon'
          }).subscribe(
            response => {
              console.log(response.text());
              this.icono.id = response.json();
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

  public eliminarImage(){
    this.imagesService.deleteImages(this.icono.id).subscribe(
      response => {
        this.subida = false;
        this.clases.thumbnail = true;
      },
      error => {
        console.log("ERROR en el borrado de la imagen");
      }
    );
    let urlDelete = this.icono.url.replace(/\//g,"\\");
    this.uploadFiles.deleteFiles(urlDelete).subscribe(
      response => {
        console.log("Imagen eliminada");
      },
      error => {
        console.log("");
      }  
    );
    this.clases.msgCorrecto = true;
  }
}
