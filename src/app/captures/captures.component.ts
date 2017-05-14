import { Component, OnInit, Input } from '@angular/core';
import { UploadFiles } from './../service/upload.service';
import { Globals } from './../app.global';
import { ImagesService } from './../service/images.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'captures',
  providers: [ Globals ],
  templateUrl: './captures.component.html',
  styleUrls: ['./captures.component.css']
})
export class CapturesComponent implements OnInit {

	private numFiles:number = 0;
	private files:any = '';//Guardaremos el array de files que se carguen en el input
	private numSubidas = 0;
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
	private msgIncorrecto = true;

	//Mapa para controlar los thumbnails, tanto las urls como su vision
	private vision_thumbnails = [
		{ "url": "", "vision": true},
		{ "url": "", "vision": true},
		{ "url": "", "vision": true},
		{ "url": "", "vision": true},
		{ "url": "", "vision": true},
	]

	private numImgSubidas = 0;

	@Input()
	private idFotos:string;

	constructor(private uploadFiles:UploadFiles, private globals:Globals, private imagesService:ImagesService) { }

	ngOnInit() {
		console.log(this.idFotos);
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
		this.files = event.srcElement.files;
		console.log(this.files);
	}

	/*
		Método que se ejecutará cuando se produzca el evento click sobre el botón
		de subir. En este método se realizará la petición ajax para subir la imagen.
	*/
	upload(){
		console.log("Subir imagen");
		console.log(this.formData);

		//Comprobamos que el número de ficheros no es vacío, no supera 5 y el num de
		//ficheros que se han subido ya no son mas de 5
		if(this.files != '' && (this.numFiles + this.files.length <= 5) && this.files.length <= 5){
			this.numFiles = this.numFiles + this.files.length;
			if(this.numFiles <= 5){
				if(this.numFiles == 5)
					this.subida = true;
				/*
					Por cada fichero subido al input creamos un nuevo objeto FormData al que
					le asignaremos cada fichero con el nombre file que es el que se recibirá
					en el parámetro @FormData del sevidor. Por últimno realizamos una petición
					ajax por cada fichero.
				*/
				for(let num=0; num<this.vision_thumbnails.length-1; num++){
					this.vision_thumbnails[num].vision = true;
				}
				for(let i=0; i<this.files.length; i++){
					//console.log(this.files[i]);
					this.formData = new FormData();
					this.formData.append("file", this.files[i]);
					let url = "";
					this.uploadFiles.uploadFiles(this.formData,'capture',this.idFotos).subscribe(
						response => {
							//console.log(response.json());
							this.msgCorrecto = false;
							this.msgIncorrecto = true;
							url = response.text();
				          	url = url.replace(/\\/g, "/");
	          				url = this.globals.HOST + url;
							this.vision_thumbnails[i] = { "url": url, "vision": false};
							this.imagesService.postImages({
					            "id_fotos": this.idFotos,
					            "url": url,
					            "type": 'capture'
				          	}).subscribe(
					            response => {
					              console.log(response.text());
					            },
					            error => {

					            }
				          	);
						},
						error => {
							console.log("ERROR en la subida de imagen");
						}
					);
					console.log(url);
				}
				console.log(this.vision_thumbnails);
			}else{
				this.msgIncorrecto = false;
				this.msgCorrecto = true;	
			}
		}else{
			this.msgIncorrecto = false;
			this.msgCorrecto = true;
		}
	}
}
