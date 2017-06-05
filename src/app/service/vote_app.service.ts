import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class Vote_appService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/votes_apps';

	constructor(private http:Http){}

	getAverageByApp(id){
		console.log('Ejecutando servicio getAverageByApp');
		let url = this.urlBase + "/averageVotes/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}
}
