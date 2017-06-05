import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class FiltrosService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/filtros';

	constructor(private http:Http){}

	Busqueda(busq){
		let url = this.urlBase + "/" + busq;
		console.log('Ejecutando servicio enviarFiltros');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	BusquedaDataset(busq){
		let url = this.urlBase + "/dataset/" + busq;
		console.log('Ejecutando servicio enviarFiltros');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}
	
	enviarFiltros(filtros){
		console.log('Ejecutando servicio enviarFiltros');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,filtros,options);
	}

	enviarFiltrosDatasets(filtros){
		let url = this.urlBase + "/datasets";
		console.log('Ejecutando servicio enviarFiltros');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(url,filtros,options);
	}

}