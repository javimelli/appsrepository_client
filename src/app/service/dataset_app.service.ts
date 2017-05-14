import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class Dataset_appService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/datasets_apps';

	constructor(private http:Http){}

	getDataset_app(){
		console.log('Ejecutando servicio getDataset_app');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	postDataset_app(dataset_app){
		console.log('Ejecutando servicio post');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,dataset_app,options);
	}
}