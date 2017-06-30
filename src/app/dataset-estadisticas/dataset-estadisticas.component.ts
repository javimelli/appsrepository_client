import { Component, OnInit } from '@angular/core';
import { DataSetService } from './../service/dataset.service';
import { InstitutionService } from './../service/institution.service';
import { CategoryService } from './../service/category.service';
import { Dataset_appService } from './../service/dataset_app.service';
import { UserService } from './../service/user.service';
import { EstadisticasService } from './../service/estadisticas.service';

@Component({
  selector: 'dataset-estadisticas',
  templateUrl: './dataset-estadisticas.component.html',
  styleUrls: ['./dataset-estadisticas.component.css']
})
export class DatasetEstadisticasComponent implements OnInit {

	private datasets = [];

	constructor(private dataSetService:DataSetService, private institutionService:InstitutionService, private categoryService:CategoryService, private dataset_appService:Dataset_appService, private userService:UserService, private estadisticasService:EstadisticasService) {
		this.estadisticasService.getDatasetsByTitle().subscribe(
			response => {
				this.datasets = response.json();
				console.log(this.datasets);
				for(let i=0; i<this.datasets.length; i++){
					this.institutionService.getInstituionById(this.datasets[i].institution_id).subscribe(
						response => {
							this.datasets[i].nameInstitution = response.json().name;
							this.datasets[i].countryInstitution = response.json().country;
							this.datasets[i].provinceInstitution = response.json().province;
							this.datasets[i].cityInstitution = response.json().city;
							//console.log(this.institution);
						},
						error => {

						}
					);
					this.categoryService.getCategoryById(this.datasets[i].category_id).subscribe(
						response => {
							this.datasets[i].categoria = response.json().name;
							//console.log(this.categoria);
						},
						error => {

						}
					);
					this.dataset_appService.getDataset_appByDataset(this.datasets[i].id).subscribe(
						response => {
							this.datasets[i].apps = response.json().length;
							//console.log("APPS: ",this.apps);
						}
					);
					this.userService.getUserById(this.datasets[i].user_id).subscribe(
						response => {
							this.datasets[i].owner = response.json().username;
							//console.log(this.owner);
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

	ngOnInit() {}

}
