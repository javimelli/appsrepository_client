import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class Vote_appService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/votes_apps';

	constructor(private http:Http){}

	getVoteByUser(id){
		console.log('Ejecutando servicio getVoteByUser');
		let url = this.urlBase + "/user/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}	
	
	getAverageByApp(id){
		console.log('Ejecutando servicio getAverageByApp');
		let url = this.urlBase + "/averageVotes/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	putVoteApp(voto, id_user, id_app){
		console.log('Ejecutando servicio putVoteApp');
		let url = this.urlBase + "/" + id_user + "/" + id_app;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.put(url,voto,options);		
	}

	postVoteApp(voto){
		console.log('Ejecutando servicio postVoteApp');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,voto,options);	
	}
}
