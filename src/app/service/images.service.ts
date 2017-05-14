import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class ImagesService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/images';

	constructor(private http:Http){}

	getImages(){
		console.log('Ejecutando servicio getImages');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	getImagesById(id){
		console.log('Ejecutando servicio getCategoryById');0
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getImagesById_fotos(id_fotos){
		console.log("Ejecutando servicio getImagesById_fotos");
		let url = this.urlBase + "/id_fotos/" + id_fotos;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	postImages(images){
		console.log('Ejecutando servicio post');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,images,options);
	}

	deleteImages(id){
		console.log('Ejecutando servicio deteImages');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.delete(url,options);
	}
}