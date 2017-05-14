import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class SessionService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/session';

	constructor(private http:Http){}

	startLogin(user) {
		console.log('Ejecutando servicio startLogin');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true });
		return this.http.post(this.urlBase,user,options);
	}

	getUserSession(){
		console.log('Ejecutando servicio getUserSession');
		let headers = new Headers();
		return this.http.get(this.urlBase,{ headers: headers, withCredentials: true });
	}

	getUserSessionServlet(user){
		console.log('Ejecutando servicio Servlet');
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers, withCredentials: true });		//let options = new RequestOptions({ withCredentials: true });

		return this.http.post('http://localhost:8080/ApiRestRepositorio/LoginServlet',user,options);
	}

	logOut(){
		console.log('Ejecutando servicio logOut');
		let headers = new Headers();
		let options = new RequestOptions({headers: headers, withCredentials: true });
		return this.http.get(this.urlBase+'/logout',options);

	}
}
