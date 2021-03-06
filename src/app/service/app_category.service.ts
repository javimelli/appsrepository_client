import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class App_categoryService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/apps_categorys';

	constructor(private http:Http){}

	getApp_categorys(){
		console.log('Ejecutando servicio getApp_categorys');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(this.urlBase,options);
	}
	getApp_categorysByApp(id){
		console.log('Ejecutando servicio getApp_categorysByApp');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getAppByCategory(id){
		console.log('Ejecutando servicio getApp_categorysByApp');
		let url = this.urlBase + "/category/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getAppByCategoryAndCountry(id,country){
		console.log('Ejecutando servicio getAppByCategoryAndCountry');
		let url = this.urlBase + "/category/" + id + "/pais/" + country;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	postApp_category(app_category){
		console.log('Ejecutando servicio post');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,app_category,options);
	}

	deleteByApp(id){
		console.log('Ejecutando servicio deleteByApp');
		let url = this.urlBase + "/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.delete(url,options);
	}
}