import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class UploadFiles {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/image';

	constructor(private http:Http){}

	uploadFiles(files,text,id){
		this.urlBase = "http://localhost:8080/ApiRestRepositorio/resources/image?img="+text+"&id_form="+id;
		console.log('Ejecutando servicio UploadFiles');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,files,options);
	}
}