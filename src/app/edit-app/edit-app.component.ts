import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../service/category.service';
import { PlatformService } from './../service/platform.service';
import { DataSetService } from './../service/dataset.service';
import { InstitutionService } from './../service/institution.service';
import { AppService } from './../service/app.service';
import { App_categoryService } from './../service/app_category.service';
import { App_PlatformService } from './../service/app_platform.service';
import { Dataset_appService } from './../service/dataset_app.service';
import { ImagesService } from './../service/images.service';
import { SessionService } from './../service/session.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit {

	//Id de la app a modificar
	private appId;

	private userSession = {"name": '', "id": 9999};
	private insertada = true;

  	//Atributos para guardar la insformacion en peticiones Ajax
	private categorias = [];
	private plataformas = [];
	private datasets = [];
	private institutions = [];
	private countrys = [];

	//Cuenta el numero de selects visibles
	private numCategorias = 2;//Empieza a contar a partir de la segunda categoria
	private numPlataformas = 2;//Empieza a contar a partir de la segunda plataforma
	private numDatasets = 2//Empiaza a contar a partir del segundo dataset

	//Es el id que se genera para cada usuario en un formulario
	private id_fotos:any = 0;

	//Atributos para la vision de los formularios de dataset e institucion
	private formDataset:boolean = true;
	private formInstitution:boolean = true;

	//Booleanos para indicar si hay algun select de mas
	private categoriaAnidada = false;
	private plataformaAnidada = false; 
	private datasetAnidado = false;

	//Atributos para controlas la vision y los valores de los selects de mas
	private vision_categorias = {
		"categoria2": true,
		"categoria3": true,
		"categoria4": true,
		"categoria5": true,
		"categoria_1": 9999,
		"categoria_2": 9999,
		"categoria_3": 9999,
		"categoria_4": 9999,
		"categoria_5": 9999
	}
	private vision_plataformas = {
		"plataforma2": true,
		"plataforma3": true,
		"plataforma4": true,
		"plataforma5": true,
		"plataforma_1": 9999,
		"plataforma_2": 9999,
		"plataforma_3": 9999,
		"plataforma_4": 9999,
		"plataforma_5": 9999
	}
	private vision_datasets = {
		"dataset2": true,
		"dataset3": true,
		"dataset4": true,
		"dataset5": true,
		"dataset6": true,
		"dataset7": true,
		"dataset8": true,
		"dataset9": true,
		"dataset10": true,
		"dataset_1": 9999,
		"dataset_2": 9999,
		"dataset_3": 9999,
		"dataset_4": 9999,
		"dataset_5": 9999,
		"dataset_6": 9999,
		"dataset_7": 9999,
		"dataset_8": 9999,
		"dataset_9": 9999,
		"dataset_10": 9999
	}

	//------------------------MAPA DE CLASES para validaciones----------------------------------

	private clases = {
		"msgObligatoriosDataset": true,
		"msgObligatoriosInstitution": true,
		"msgObligatoriosApp": true,
		"msgInsercionDataset": true,
		"msgCaracteres": true,
		"msgInsercionInstitution": true,
		"nameInstitution": false,
		"countryInstitution": false,
		"categoryDataset": false,
		"titleDataset": false,
		"descriptionDataset": false,
		"uriDatasetDataset": false,
		"institution_idDataset": false,
		"titleApp": false,
		"descriptionApp": false,
		"priceApp": false,
		"languageApp": false,
		"categoryApp": false,
		"platformApp": false,
		"datasetApp": false
	}

	//----------------------------------------MODELO-------------------------------------------

	private institution = {
		"id": 0,
		"name": '',
		"country": '',
		"city": '',
		"province": ''
	}

	private dataset = {
		"id": 0,
		"title": '',
		"category_id": 9999,
		"user_id": 0,
		"description": '',
		"uri_dataset": '',
		"institution_id": 9999
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
		"id_fotos": ""
	}

	private app_category = {
		"app_id": 9999,
		"category_id": 9999
	}

	private app_platform = {
		"app_id": 9999,
		"platform_id": 9999,
		"url_download": ''
	}

	private dataset_app = {
		"app_id": 9999,
		"dataset_id": 9999
	}
	//---------------------------------------------------------------------------------------------------------
	constructor(private categoryService:CategoryService, private platformService:PlatformService, private dataSetService:DataSetService, private institutionService:InstitutionService, private appService:AppService, private app_categoryService:App_categoryService, private app_PlatformService:App_PlatformService, private dataset_appService:Dataset_appService, private activatedRoute: ActivatedRoute, private imagesService:ImagesService, private sessionService:SessionService, private router: Router) {
		this.sessionService.getUserSession().subscribe(
			response => {
				if(response.status == 204)
					this.router.navigate(['/login']);
				this.userSession = response.json();
				if(response.status == 200 && this.userSession.name != ''){
					console.log(this.userSession);
				}else{
					this.router.navigate(['/login']);
				}
			},
			error => {
				console.log(error);
				if(error.status == 401){
					//this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
					this.router.navigate(['/login']);
				}
			}
		);
	}

	ngOnInit() {
		this.appId = this.activatedRoute.snapshot.params['id'];
		console.log("Id de la app a modificar: "+this.appId);
		this.cargarDatasets();
		this.cargarPaises();
		this.cargarIdiomas();
		this.cargarCategorias();
		this.cargarPlataformas();
		this.cargarInstituciones();
		//Creamos el numero aleatorio para las fotogtradias
		var aleatorio = Math.round(Math.random() * (9999 - 1000) + 1000);
		var date = new Date();
		this.id_fotos = date.getDate()+"_"+date.getMonth()+"_"+date.getFullYear()+"_"+date.getHours()+"_"+date.getMinutes()+"_"+date.getSeconds()+"_"+aleatorio;
		this.cargarDatos();
		console.log(this.app.id_fotos);
	}

	ngAfterViewInit(){
		
	}

	//---------------------------------------------------------Cargado de Selects-------------------------------------------------------------------------
	public cargarPaises(){
		$.getJSON("../../assets/JSON/paises.json", function(datos) {
		    //console.log(datos);
		    $('#pais').append('<option value="0">Selecciona un país</option>');
		    $.each(datos, function(idx,nombre) {
		        //console.log("País: " + nombre);
		        $('#pais').append('<option value="'+nombre+'">'+nombre+'</option>');
		    });
		});
	}

	public cargarIdiomas(){
		//console.log('Estamos aquí');
		$.getJSON("../../assets/JSON/idiomas.json", function(datos) {
		    //console.log(datos);
		    $('#idioma').append('<option value="0">* Selecciona un idioma</option>');
		    $.each(datos, function(idx,nombre) {
		        //console.log("País: " + nombre);
		        $('#idioma').append('<option value="'+nombre+'">'+nombre+'</option>');
		    });
		});
	}

	public cargarCategorias(){
		this.categoryService.getCategorys().subscribe(
			response => {
				//console.log(response.json());
				$("#categoria,#categoria-2,#categoria-3,#categoria-4,#categoria-5,#categoria-dataset").append('<option value="9999">* Seleccione una categoria</option>');
				this.categorias = response.json();
				for(let i=0; i<this.categorias.length; i++){
					$("#categoria,#categoria-2,#categoria-3,#categoria-4,#categoria-5,#categoria-dataset").append('<option value="'+this.categorias[i].id+'">'+this.categorias[i].name+'</option>');
				}
				this.cargarCategoriasApp();
			},
			error => {

			}
		);
	}

	public cargarPlataformas(){
		this.platformService.getPlatform().subscribe(
			response => {
				//console.log(response.json());
				$("#plataforma,#plataforma-2,#plataforma-3,#plataforma-4,#plataforma-5").append('<option value="9999">* Seleccione una categoria</option>');
				this.plataformas = response.json();
				for(let i=0; i<this.plataformas.length; i++){
					$("#plataforma,#plataforma-2,#plataforma-3,#plataforma-4,#plataforma-5").append('<option value="'+this.plataformas[i].id+'">'+this.plataformas[i].name+'</option>');
				}
				this.cargarPlataformasAdd();
			},
			error => {

			}
		);
	}

	public cargarInstituciones(){
		this.institutionService.getInstituions().subscribe(
			response => {
				this.institutions = response.json();
				let ciudad = "";
				let province = "";
				$('#institution').append('<option value="9999">* Selecciona una Institución</option>');
				for(let i=0; i<this.institutions.length; i++){
					if(this.institutions[i].city != ''){
						ciudad = ' de la ciudad de '+this.institutions[i].city;
					}
					if(this.institutions[i].province != ""){
						province = ' en la provincia de '+this.institutions[i].province;
					}
					$('#institution').append('<option value="'+this.institutions[i].id+'">'+this.institutions[i].name+ciudad+province+' en el país '+this.institutions[i].country+'</option>');
					ciudad = '';
					province = '';
				}
			},
			error => {
				console.log("ERROR al obtener las instituciones");
			}
		);	
	}

	public cargarDatasets(){
		this.dataSetService.getDatasets().subscribe(
			response => {
				this.datasets = response.json();
				$("#dataset,#dataset-2,#dataset-3,#dataset-4,#dataset-5,#dataset-6,#dataset-7,#dataset-8,#dataset-9,#dataset-10").append('<option value="9999">* Seleccione dataset</option>');
				console.log(this.datasets);
				for(let i=0; i<this.datasets.length; i++){
					$("#dataset,#dataset-2,#dataset-3,#dataset-4,#dataset-5,#dataset-6,#dataset-7,#dataset-8,#dataset-9,#dataset-10").append('<option value="'+this.datasets[i].id+'">'+this.datasets[i].title+'</option>');
				}
				this.cargarDatasetsApp();
			},
			error => {
				console.log('ERROR AL CARGAR LOS DATASETS');
			}
		);
	}

	public cargarDatos(){
		//Cargamos los datos de la App
		this.appService.getAppsById(this.appId).subscribe(
			response => {
				//Controlar que el usuario registrado es el dueño de la noticia
				this.app = response.json();
				if(this.app.user_id == this.userSession.id){
					console.log(this.app);
				}else{
					this.router.navigate(['/']);
				}
			},
			error => {
				console.log("ERROR en la carga de la app");
			}
		);
	}

	public cargarCategoriasApp(){
		//Cargamos los datos de las categorias
		let apps_categorys = [];
		this.app_categoryService.getApp_categorysByApp(this.appId).subscribe(
			response => {
				apps_categorys = response.json();
				console.log(apps_categorys);
				this.vision_categorias.categoria_1 = apps_categorys[0].id;
				let numCategoria = 2;//Contamos desde la 2 porque la 1 lla cargamos antes del for
				for(let i=1; i<apps_categorys.length; i++){
					this.vision_categorias["categoria_"+numCategoria] = apps_categorys[i].id;
					numCategoria++;
					this.addCategoriaSelect();
				}
			},
			error => {
				console.log("ERROR al cargar las categorías");
			}
		);
	}

	public cargarPlataformasAdd(){
		let apps_platforms = [];
		this.app_PlatformService.getApp_platformByApp(this.appId).subscribe(
			response => {
				apps_platforms = response.json();
				console.log(apps_platforms);
				this.vision_plataformas.plataforma_1 = apps_platforms[0].id;
				let numPlatform = 2;
				for(let j=1; j<apps_platforms.length; j++){
					this.vision_plataformas["plataforma_"+numPlatform] = apps_platforms[j].id;
					numPlatform++;
					this.addPlataformaSelect();
				}
			},
			error => {
				console.log("ERROR al cargar las plataformas");
			}
		);
	}

	public cargarDatasetsApp(){
		let datasets_apps = [];
		this.dataset_appService.getDataset_appByApp(this.appId).subscribe(
			response => {
				datasets_apps = response.json();
				console.log(datasets_apps);
				this.vision_datasets.dataset_1 = datasets_apps[0].id;
				let numDataset = 2;
				for(let n=1; n<datasets_apps.length; n++){
					this.vision_datasets["dataset_"+numDataset] = datasets_apps[n].id;
					numDataset++;
					this.addDatasetSelect();
				}
			},
			error => {
				console.log("ERROR en la carga de los datasets");
			}
		);
	}

	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	//----------------------------------------Metodos para la visión o no de más selects de categoria(5), plataforma(5) y dataset(10)-------------------------------------------
	public addCategoriaSelect(){
		switch(this.numCategorias){
			case 2:
				this.categoriaAnidada = true;
				this.vision_categorias.categoria2 = false;
			break;
			case 3:
				this.vision_categorias.categoria3 = false;
			break;
			case 4:
				this.vision_categorias.categoria4 = false;
			break;
			case 5:
				this.vision_categorias.categoria5 = false;
			break;
		}
		if(this.numCategorias < 5)
			this.numCategorias++;
	}

	public eliminarCategoria(){
		switch(this.numCategorias){
			case 2:
				this.categoriaAnidada = false;
				this.vision_categorias.categoria2 = true;
			break;
			case 3:
				this.vision_categorias.categoria3 = true;
			break;
			case 4:
				this.vision_categorias.categoria4 = true;
			break;
			case 5:
				this.vision_categorias.categoria5 = true;
			break;
		}
		if(this.numCategorias > 2)
			this.numCategorias--;
	}



	public addPlataformaSelect(){
		switch(this.numPlataformas){
			case 2:
				this.plataformaAnidada = true;
				this.vision_plataformas.plataforma2 = false;
			break;
			case 3:
				this.vision_plataformas.plataforma3 = false;
			break;
			case 4:
				this.vision_plataformas.plataforma4 = false;
			break;
			case 5:
				this.vision_plataformas.plataforma5 = false;
			break;
		}
		if(this.numPlataformas < 5)
			this.numPlataformas++;
	}

	public eliminarPlataforma(){
		switch(this.numPlataformas){
			case 2:
				this.plataformaAnidada = false;
				this.vision_plataformas.plataforma2 = true;
			break;
			case 3:
				this.vision_plataformas.plataforma3 = true;
			break;
			case 4:
				this.vision_plataformas.plataforma4 = true;
			break;
			case 5:
				this.vision_plataformas.plataforma5 = true;
			break;
		}
		if(this.numPlataformas > 2)
			this.numPlataformas--;
	}

	public addDatasetSelect(){
		switch(this.numDatasets){
			case 2:
				this.datasetAnidado = true;
				this.vision_datasets.dataset2 = false;
			break;
			case 3:
				this.vision_datasets.dataset3 = false;
			break;
			case 4:
				this.vision_datasets.dataset4 = false;
			break;
			case 5:
				this.vision_datasets.dataset5 = false;
			break;
			case 6:
				this.vision_datasets.dataset6 = false;
			break;
			case 7:
				this.vision_datasets.dataset7 = false;
			break;
			case 8:
				this.vision_datasets.dataset8 = false;
			break;
			case 9:
				this.vision_datasets.dataset9 = false;
			break;
			case 10:
				this.vision_datasets.dataset10 = false;
			break;
		}
		if(this.numDatasets < 10)
			this.numDatasets++;
	}

	public eliminarDataset(){
		switch(this.numDatasets){
			case 2:
				this.datasetAnidado = false;
				this.vision_datasets.dataset2 = true;
			break;
			case 3:
				this.vision_datasets.dataset3 = true;
			break;
			case 4:
				this.vision_datasets.dataset4 = true;
			break;
			case 5:
				this.vision_datasets.dataset5 = true;
			break;
			case 6:
				this.vision_datasets.dataset6 = true;
			break;
			case 7:
				this.vision_datasets.dataset7 = true;
			break;
			case 8:
				this.vision_datasets.dataset8 = true;
			break;
			case 9:
				this.vision_datasets.dataset9 = true;
			break;
			case 10:
				this.vision_datasets.dataset10 = true;
			break;
		}
		if(this.numDatasets > 2)
			this.numDatasets--;
	}
	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	//-------------------------------------------------------Metodos para ver u ocultar los formularios de institución y dataset---------------------------------------------
	public addNuevaInstitution(){
		this.formInstitution = false;
	}

	public ocultarFormInstitution(){
		this.formInstitution = true;
	}

	public addNuevoDataset(){
		this.formDataset = false;
	}

	public ocultarFormDataset(){
		this.formDataset = true;
	}

	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	//----------------------------------------Metodo que se ejecutara con el evento blur en los campos obligatorios para quitarles la clase error-------------------------------
	public inputCorrecto(input){
		switch(input){
			case 'nameInstitution':
				if(this.institution.name != '')
					this.clases.nameInstitution = false;
			break;
			case 'countryInstitution':
				if(this.institution.country != '')
					this.clases.countryInstitution = false;
			break;
			case 'institution_idDataset':
				if(this.dataset.institution_id != 9999)
					this.clases.institution_idDataset = false;
			break;
			case 'titleDataset':
				if(this.dataset.title != '')
					this.clases.titleDataset = false;
			break;
			case 'categoryDataset':
				if(this.dataset.category_id != 9999)
					this.clases.categoryDataset = false;
			break;
			case 'descriptionDataset':
				if(this.dataset.description != '')
					this.clases.descriptionDataset = false;
			break;
			case 'uriDatasetDataset':
				if(this.dataset.uri_dataset != '')
					this.clases.uriDatasetDataset = false;
			break;
			case 'titleApp':
				if(this.app.title != '')
					this.clases.titleApp = false;
			break;
			case 'descriptionApp':
				if(this.app.description != "")
					this.clases.descriptionApp = false;
			break;
			case 'languageApp':
				if(this.app.language != '0')
					this.clases.languageApp = false;
			break;
			case 'categoryApp':
				if(this.vision_categorias.categoria_1 != 9999)
					this.clases.categoryApp = false;
			break;
			case 'platformApp':
				if(this.vision_plataformas.plataforma_1 != 9999)
					this.clases.platformApp = false;
			break;
			case 'datasetApp':
				if(this.vision_datasets.dataset_1 != 9999)
					this.clases.datasetApp = false;
			break;
		}
	}

	//-------------------------------------------------------------------Changes de los inputs----------------------------------------------------------------------------

	public changeInstitution(){
		
	}

	//--------------------------------------------------------Envios de formularios---------------------------------------------------------------------------------

	public enviarInstitution(){
		var pattWrite = /\w{1,45}/g;
		//VALIDACIONES

		if(this.institution.name == ''){
			this.clases.nameInstitution = true;
			this.clases.msgObligatoriosInstitution = false;
		}
		if(this.institution.country == ''){
			this.clases.countryInstitution = true;
			this.clases.msgObligatoriosInstitution = false;	
		}

		if(this.clases.nameInstitution == false && this.clases.countryInstitution == false){
			this.clases.msgObligatoriosInstitution = true;	
		}

		if(this.clases.msgObligatoriosInstitution == true){
			this.institutionService.postInstitution(this.institution).subscribe(
				response => {
					let idInstitution = response.json();
					console.log(idInstitution);
					this.ocultarFormInstitution();
					$("#institution").empty();
					this.cargarInstituciones();
					this.dataset.institution_id = idInstitution;
					this.clases.msgInsercionInstitution = false;
				},
				error => {
					console.log("ERROR en el POST de intitution");
				}
			);
		}

	}

	public enviarDataset(){
		//validamos los campos no nulos en la base de datos
		console.log("Enviando formulario");
		//console.log("ATENTO: "+this.institution.name);
		if(this.dataset.institution_id == 9999){
			this.clases.institution_idDataset = true;
			this.clases.msgObligatoriosDataset = false;
		}
		if(this.dataset.title == ''){
			this.clases.titleDataset = true;
			this.clases.msgObligatoriosDataset = false;
		}
		if(this.dataset.category_id == 9999){
			this.clases.categoryDataset = true;
			this.clases.msgObligatoriosDataset = false;	
		}
		if(this.dataset.description == ''){
			this.clases.descriptionDataset = true;
			this.clases.msgObligatoriosDataset = false;	
		}
		if(this.dataset.uri_dataset == ''){
			this.clases.uriDatasetDataset = true;
			this.clases.msgObligatoriosDataset = false;	
		}

		if(this.clases.categoryDataset == false && this.clases.descriptionDataset == false &&
		 this.clases.uriDatasetDataset == false && this.clases.titleDataset == false){
			this.clases.msgObligatoriosDataset = true;	
		}

		if(this.clases.msgObligatoriosDataset == true){ 
			this.dataSetService.postDataset(this.dataset).subscribe(
				response => {
					let idDataset = response.json();
					if(idDataset != 9999){
						console.log("SUCCESS inserción correcta");
						$("#dataset,#dataset-2,#dataset-3,#dataset-4,#dataset-5,#dataset-6,#dataset-7,#dataset-8,#dataset-9,#dataset-10").empty();
						this.cargarDatasets();
						this.ocultarFormDataset();
						this.clases.msgInsercionInstitution = true;
						this.clases.msgInsercionDataset = false;
						//Poner el valor del dataset en el modelo de app
					}else{
						console.log("ERROR en la inserción con el id del usuario registrado");
					}
				},
				error => {
					console.log("ERROR en la inserción del Dataset");
				}
			);
		}
	}

	public enviarForm(){
		console.log('Formulario enviado');
		if(this.app.title == ""){
			this.clases.titleApp = true;
			this.clases.msgObligatoriosApp = false;
		}
		if(this.app.description == ""){
			this.clases.descriptionApp = true;
			this.clases.msgObligatoriosApp = false;	
		}
		if(this.app.language == "0"){
			this.clases.languageApp = true;
			this.clases.msgObligatoriosApp = false;	
		}
		if(this.vision_datasets.dataset_1 == 9999){
			this.clases.datasetApp = true;
			this.clases.msgObligatoriosApp = false;	
		}
		if(this.vision_categorias.categoria_1 == 9999){
			this.clases.categoryApp = true;
			this.clases.msgObligatoriosApp = false;	
		}
		if(this.vision_plataformas.plataforma_1 == 9999){
			this.clases.platformApp = true;
			this.clases.msgObligatoriosApp = false;	
		}

		if(this.clases.titleApp == false && this.clases.descriptionApp == false && this.clases.languageApp == false &&
			this.clases.datasetApp == false && this.clases.categoryApp == false && this.clases.platformApp == false){
			this.clases.msgObligatoriosApp = true;
		}

		if(this.clases.msgObligatoriosApp == true){
			//PRIMERO INSERTAMOS LA APP

			var categorias = ["categoria_1","categoria_2","categoria_3","categoria_4","categoria_5"];
			var plataformas = ["plataforma_1","plataforma_2","plataforma_3","plataforma_4","plataforma_5"];
			var datasets = ["dataset_1","dataset_2","dataset_3","dataset_4","dataset_5","dataset_6","dataset_7","dataset_8","dataset_9","dataset_10"];

			//appService
			this.appService.putApp(this.app,this.appId).subscribe(
				response => {
					let save = response.text();
					console.log("Id app: "+save);
					if(save == 'true'){
						console.log("SUCCESS Actualización correcta");
						//Borramos todos los registros con la app de categorías y después
						this.app_categoryService.deleteByApp(this.appId).subscribe(
							response => {
								//Recorremos las categorias, vemos si esta en el array de categorias y si su valor es distinto de 9999 
								for(let categoria in this.vision_categorias){
									//console.log(categoria+": "+this.vision_categorias[categoria]);
									let categoriaVista = categoria.replace(/_/g,'');
									//console.log(categoriaVista);
									if(categorias.indexOf(categoria) != -1 && this.vision_categorias[categoria] != 9999){
										if(this.vision_categorias[categoriaVista] == false || categoria == "categoria_1"){
											console.log(categoria+" debe ser insertada, además "+categoriaVista+" es true");
											this.app_category.app_id = this.appId;
											this.app_category.category_id = this.vision_categorias[categoria];
											this.app_categoryService.postApp_category(this.app_category).subscribe(
												response => {
													console.log("Insertado app_category con éxito");
												},
												error => {
													console.log("Error en la inserción de app_category");
												}
											);
										}
									}
								}
							},
							error => {
								console.log("ERROR en el borrado de app_categorys");
							}
						);
						
						this.app_PlatformService.deleteByApp(this.appId).subscribe(
							response => {
								//Recorremos las plataformas de la misma manera que las categorias			
								for(let plataforma in this.vision_plataformas){
									//console.log(plataforma+": "+this.vision_plataformas[plataforma]);
									let plataformaVista = plataforma.replace(/_/g,'');
									if(plataformas.indexOf(plataforma) != -1 && this.vision_plataformas[plataforma] != 9999){
										if(this.vision_plataformas[plataformaVista] == false || plataforma == "plataforma_1"){
											this.app_platform.app_id = this.appId;
											this.app_platform.platform_id = this.vision_plataformas[plataforma];
											this.app_PlatformService.postApp_platform(this.app_platform).subscribe(
												response => {
													console.log("Insertdao app_platform con éxito");
												},
												error => {
													console.log("Error en la inserción de app_platform");
												}
											); 
										}
									}
								}
							},
							error => {
								console.log("ERROR en el borrado de app_platforms");
							}
							
						);

						this.dataset_appService.deleteByApp(this.appId).subscribe(
							response => {
								//Recorremos los datasetts igual que las categorias y las plataformas
								for(let dataset in this.vision_datasets){
									//console.log(dataset+": "+this.vision_datasets[dataset]);
									let datasetVisto = dataset.replace(/_/g,'');
									if(datasets.indexOf(dataset) != -1 && this.vision_datasets[dataset] != 9999){
										if(this.vision_datasets[datasetVisto] == false || dataset == "dataset_1"){
											this.dataset_app.app_id = this.appId;
											this.dataset_app.dataset_id = this.vision_datasets[dataset];
											this.dataset_appService.postDataset_app(this.dataset_app).subscribe(
												response => {
													console.log("Insertado dataset_app con éxito");
												},
												error => {
													console.log("Error en la inserción de dataset_app");
												}
											);
										}
									}
								}
							},
							error => {
								console.log("ERROR en el borrado de dataset_apps");
							}
						);
						this.insertada = false;
					}else{
						console.log("ERROR en la inserción con el id del usuario registrado");
					}
				},
				error => {
					console.log('ERROR en la inserción de la app');
				}
			);
		}
	}

}
