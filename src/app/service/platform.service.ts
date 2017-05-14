import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class PlatformService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/platforms';

	constructor(private http:Http){}

	getPlatform(){
		console.log('Ejecutando servicio getPlatforms');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}
}