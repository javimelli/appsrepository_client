import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class App_PlatformService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/apps_platforms';

	constructor(private http:Http){}

	getApp_platform(){
		console.log('Ejecutando servicio getApp_platform');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	postApp_platform(app_platform){
		console.log('Ejecutando servicio postApp_platform');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,app_platform,options);
	}
}