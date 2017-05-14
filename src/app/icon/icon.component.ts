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

  private msgCorrecto = true;

  private url = "";

  @Input()
  private idFotos: string;

  constructor(private uploadFiles:UploadFiles, private globals:Globals, private imagesService:ImagesService) { }

  ngOnInit() {
    console.log("Desde icon: "+this.idFotos);
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
  	console.log(this.file);
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
          this.url = response.text();
          //Cambiamos las barras '\' por barras '/' por si el directorio viene de windows
          this.url = this.url.replace(/\\/g, "/");
          this.url = this.globals.HOST + this.url;
          console.log(this.url);
          this.subida = true;
          this.msgCorrecto = false;
          this.imagesService.postImages({
            "id_fotos": this.idFotos,
            "url": this.url,
            "type": 'icon'
          }).subscribe(
            response => {
              console.log(response.text());
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

}
