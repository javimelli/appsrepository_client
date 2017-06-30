import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class EstadisticasService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/estadisticas';

	constructor(private http:Http){}

	getAppsByTitle(){
		console.log('Ejecutando servicio getApps');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	getDatasetsByTitle(){
		console.log('Ejecutando servicio getApps');
		let url = this.urlBase + "/datasets";
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}
}