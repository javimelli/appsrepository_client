import { Component, OnInit } from '@angular/core';
import { SessionService } from './../service/session.service';

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

	private userSession = {"name": '', "id": 9999};

	constructor(private sessionService:SessionService) {
		this.sessionService.getUserSession().subscribe(
			response => {
				if(response.status != 204)//Este codigo da si el user o la pass son incorrectos.
				  this.userSession = response.json();
				else{
				}
				if(response.status == 200 && this.userSession.name != ''){//Comprobamos que la peticion es correcta y el user se completa
				  console.log(this.userSession);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit() {}

}