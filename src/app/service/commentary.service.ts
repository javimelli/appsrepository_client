import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class CommentaryService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/commentarys';

	constructor(private http:Http){}

	getCommentsByApp(id){
		console.log('Ejecutando servicio getVoteByUser');
		let url = this.urlBase + "/app/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	putCommentary(comentario){
		let url = this.urlBase + "/" + comentario.id;
		console.log('Ejecutando servicio postCommentary');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.put(url,comentario,options);
	}

	postCommentary(comentario){
		console.log('Ejecutando servicio postCommentary');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,comentario,options);
	}

	deleteCommentary(id){
		let url = this.urlBase + "/" + id;
		console.log('Ejecutando servicio postCommentary');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.delete(url,options);
	}

}