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

	getApp_platformByApp(id){
		console.log('Ejecutando servicio getApp_platformByApp');
		let url = this.urlBase + "/app/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);	
	}

	postApp_platform(app_platform){
		console.log('Ejecutando servicio postApp_platform');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,app_platform,options);
	}

	deleteByApp(id){
		console.log('Ejecutando servicio deleteByApp');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.delete(url,options);	
	}
}