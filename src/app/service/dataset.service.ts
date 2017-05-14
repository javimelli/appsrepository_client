import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class DataSetService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/datasets';

	constructor(private http:Http){}

	getDatasets(){
		console.log('Ejecutando servicio getDatasets');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}

	postDataset(dataset){
		console.log('Ejecutando post Datasets');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,dataset,options);	
	}
}