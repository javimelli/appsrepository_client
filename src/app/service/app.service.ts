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

	getAppsById(id){
		console.log('Ejecutando servicio getApps');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getAppsByOwner(id){
		console.log('Ejecutando servicio getAppsByOwner');
		let url = this.urlBase + "/owner/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getAppsByLimit(num, init){
		console.log('Ejecutando servicio getAppsByCountry');
		let url = this.urlBase + "/limit/" + num + "/" + init;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getAppsByCountry(country){
		console.log('Ejecutando servicio getAppsByCountry');
		let url = this.urlBase + "/country/" + country;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	putApp(app,id){
		console.log('Ejecutando servicio putApp');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.put(url,app,options);		
	}

	postApp(app){
		console.log('Ejecutando servicio postApps');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,app,options);
	}
}