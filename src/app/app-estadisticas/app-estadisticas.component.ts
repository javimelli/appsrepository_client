import { Component, OnInit } from '@angular/core';
import { AppService } from './../service/app.service';
import { UserService } from './../service/user.service';
import { Vote_appService } from './../service/vote_app.service';
import { Dataset_appService } from './../service/dataset_app.service';
import { App_categoryService } from './../service/app_category.service';
import { EstadisticasService } from './../service/estadisticas.service';
import { ChartsModule } from 'ng2-charts';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-estadisticas',
  templateUrl: './app-estadisticas.component.html',
  styleUrls: ['./app-estadisticas.component.css']
})
export class AppEstadisticasComponent implements OnInit {

	private apps = [];

	constructor(private appService:AppService, private userService:UserService, private vote_appService:Vote_appService, private dataset_appService:Dataset_appService, private app_categoryService:App_categoryService, private estadisticasService:EstadisticasService) {
		this.cargarAplicaciones();

	}

	ngOnInit() {}

	public cargarAplicaciones(){
		this.estadisticasService.getAppsByTitle().subscribe(
			response => {
				this.apps = response.json();
				console.log(this.apps);
				for(let i=0; i<this.apps.length; i++){
					this.userService.getUserById(this.apps[i].user_id).subscribe(
						response => {
							this.apps[i].username = response.json().username;
						},
						error => {

						}
					);
					this.vote_appService.getAverageByApp(this.apps[i].id).subscribe(
						response => {
							this.apps[i].average = response.text();
							//console.log(this.apps[i].average);
						},
						error => {

						}
					);
					this.dataset_appService.getDataset_appByApp(this.apps[i].id).subscribe(
						response => {
							this.apps[i].numDatasets = response.json().length;
							//console.log("DATASETS: ",this.datasets);
						},
						error => {

						}
					);
					this.app_categoryService.getApp_categorysByApp(this.apps[i].id).subscribe(
						response => {
							this.apps[i].categorias = response.json();
							//console.log(this.categorias);
						},
						error => {

						}
					);
				}
			},
			error => {

			}
		);
	}

}