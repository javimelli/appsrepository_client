import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class AppService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/apps';

	constructor(private http:Http){}

	getApps(){
		console.log('Ejecutando servicio getApps');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	postApp(app){
		console.log('Ejecutando servicio postApps');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,app,options);
	}
}