import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './../service/user.service';
import { InstitutionService } from './../service/institution.service';
import { DataSetService } from './../service/dataset.service';
import { CategoryService } from './../service/category.service';
import { Dataset_appService } from './../service/dataset_app.service';

@Component({
  selector: 'app-dataset-detalle',
  templateUrl: './dataset-detalle.component.html',
  styleUrls: ['./dataset-detalle.component.css']
})
export class DatasetDetalleComponent implements OnInit {

	private datasetId;

	private apps = [];

	private dataset = {
		"category_id": 9999,
		"user_id": 9999,
		"description": "",
		"uri_dataset": "",
		"institution_id": 9999,
		"title": ""
	}

	private institution = {
		"name": "",
		"country": "",
		"city": "",
		"province": ""
	}

	private categoria = {
		"name": "",
		"description": ""
	}

	private app = {
		"id": 0,
		"user_id": 0,
		"url_web": "",
		"title": "",
		"description": "",
		"url_icon": "",
		"price": 0,
		"version": 0,
		"url_video": "",
		"language": "0",
		"country": "0",
		"id_fotos": "",
		"date": "",
		"time": "",
		"visitas": 0,
		"visits": 0
	}

	private owner = {
		"id": 9999,
		"name": "",
		"Last_name1": "",
		"Last_name2": "",
		"username": "",
		"tlf": "",
		"url_web": "",
		"email": "",
		"country": "",
		"url_foto": "",
		"password": "",
	}

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private institutionService:InstitutionService, private dataSetService:DataSetService, private categoryService:CategoryService, private userService:UserService, private dataset_appService:Dataset_appService) {
		this.datasetId = this.activatedRoute.snapshot.params['id'];
		this.cargarDatos();
	}

	ngOnInit() {
	}

	public cargarDatos(){
		this.dataSetService.getDatasetsById(this.datasetId).subscribe(
			response => {
				this.dataset = response.json();
				console.log(this.dataset);
				this.cargarInstitucion();
				this.cargarCategoria();
				this.cargarOwner();
				this.cargarApps();
			},
			error => {

			}
		);
	}

	public cargarInstitucion(){
		this.institutionService.getInstituionById(this.dataset.institution_id).subscribe(
			response => {
				this.institution = response.json();
				console.log(this.institution);
			},
			error => {

			}
		);
	}

	public cargarCategoria(){
		this.categoryService.getCategoryById(this.dataset.category_id).subscribe(
			response => {
				this.categoria = response.json();
				console.log(this.categoria);
			},
			error => {

			}
		);
	}

	public cargarOwner(){
		this.userService.getUserById(this.dataset.user_id).subscribe(
			response => {
				this.owner = response.json();
				console.log(this.owner);
			},
			error => {

			}
		);
	}

	private cargarApps(){
		this.dataset_appService.getDataset_appByDataset(this.datasetId).subscribe(
			response => {
				this.apps = response.json();
				console.log("APPS: ",this.apps);
			}
		);
	}

}
