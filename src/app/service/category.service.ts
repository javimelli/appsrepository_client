import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class CategoryService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/categorys';

	constructor(private http:Http){}

	getCategorys(){
		console.log('Ejecutando servicio getCategorys');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	getCategoryById(id){
		console.log('Ejecutando servicio getCategoryById');0
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}
}