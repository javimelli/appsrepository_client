import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class Funcs {

	constructor(private http:Http){}

	//Copia el contenido del array foo en el array bar
	copyArray(foo, bar){

		for(let i=0; i<foo.length; i++){
			bar[i] = foo[i];
		}		
	}

	//Concatena el contenido de bar en foo
	concatArrays(foo, bar){
		for(let i=0; i<bar.length; i++){
			foo.push(bar[i]);
		}
	}	
}