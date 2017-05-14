import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class CookiesService{

	constructor(){}

	set_cookie(nombre, valor, dias) {
        var fecha = new Date();
        var parametro = nombre + "=" + valor;
        fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
        var UTC = fecha.toUTCString();
        document.cookie = parametro + "; expires=" + UTC + "; path= /";
    }
    
    get_cookie(nombre){
        var cookies = document.cookie;        
        var parametros = cookies.split(";");
        let x:number;    
        for (x=0; x < parametros.length; x++) {
            var parametro = parametros[x].split("=");        
            if (parametro[0].trim() == nombre) {
                var valor = parametro[1];
                break;
            }
        }    
		return valor;
    }

}
