import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/users';

	constructor(private http:Http){}

	getUserById(id){
		let url = this.urlBase + "/" + id;
		console.log('Ejecutando servicio getUserById');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getUserByIdByEdit(id){
		let url = this.urlBase + "/" + id +"?edit=1";
		console.log('Ejecutando servicio getUserById');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	postUser(user){
		console.log('Ejecutando servicio getUserById');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,user,options);
	}

	putUser(user,id){
		let url = this.urlBase + "/" + id
		console.log('Ejecutando servicio getUserById');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.put(url,user,options);
	}

	deleteUser(id){
		let url = this.urlBase + "/" + id
		console.log('Ejecutando servicio getUserById');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.delete(url,options);
	}
}