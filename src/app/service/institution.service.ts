import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class InstitutionService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/institutions';

	constructor(private http:Http){}

	getInstituions(){
		console.log('Ejecutando servicio getInstituions');
		let url = this.urlBase;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getInstituionById(id){
		console.log('Ejecutando servicio getInstituionById');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	postInstitution(institution){
		console.log('Ejecutando post de institution');
		let url = this.urlBase;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(url,institution,options);
	}
}