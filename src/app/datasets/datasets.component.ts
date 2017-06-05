import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../service/category.service';
import { DataSetService } from './../service/dataset.service';
import { FiltrosService } from './../service/filtros.service';
import { InstitutionService } from './../service/institution.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {

	private categorias = [];
	private datasets:any = [];

	//Propiedad para mostrar la categoria
	private nombre_categoria = '';
	private hayCategoria = true;
	//Propiedad para mostrar el pais
	private nombre_pais = '';
	private hayPais = true;
	//Propiedad para mostrar la ciudad
	private nombre_ciudad = '';
	private hayCiudad = true;

	//Propiedad para la búsqueda de texto
	private texto = '';

	private filtros = {
		"categoria": 9999,
		"pais": '',
		"ciudad": ''
	}	

  constructor(private categoryService:CategoryService, private dataSetService:DataSetService, private filtrosService:FiltrosService, private institutionService:InstitutionService) {
  		this.cargarCategorias();
  		this.cargarDatasets();
  }

  ngOnInit() {
  }

  public cargarCategorias(){
    this.categoryService.getCategorys().subscribe(
      response => {
        //console.log(response.json());
        this.categorias = response.json();
      },
      error => {

      }
    );
  }

  public cargarDatasets(){
  	this.dataSetService.getDatasets().subscribe(
  		response => {
  			this.datasets = response.json();
  			console.log(this.datasets);
  			for(let i=0; i<this.datasets.length; i++){
  				this.institutionService.getInstituionById(this.datasets[i].institution_id).subscribe(
  					response => {
  						let institution = {
							"country": '',
							"city": ''
						}
						institution = response.json();
  						this.datasets[i].country = institution.country;
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

  /*
	0: click sobre alguna categoria
	1: viene de cerrar la pestaña de no categoría
	2: viene de un change del input de pais
    3: viene de cerrar la pestaña de no pais
    4: viene de un change del input de ciudad
    5: viene de cerrar la pestaña de no ciudad
  */
  public enviarFiltros(num,value,nombreCategoria){

  	switch(num){
  		case 0:
  			this.hayCategoria = false;
	        this.nombre_categoria = nombreCategoria;
	        this.filtros.categoria = value;
  		break;
  		case 1:
			this.hayCategoria = true;
			this.nombre_categoria = '';
			this.filtros.categoria = 9999;
		break;
		case 2:
		    //Esta co el doble bindding
		    this.hayPais = false;
		    this.nombre_pais = this.filtros.pais;
		break;
		case 3:
		    this.filtros.pais = '';
		    this.hayPais = true;
		    this.nombre_pais = '';
		break;
		case 4:
		    //Esta co el doble bindding
		    this.hayCiudad = false;
		    this.nombre_ciudad = this.filtros.ciudad;
		break;
		case 5:
		    this.filtros.ciudad = '';
		    this.hayCiudad = true;
		    this.nombre_ciudad = '';
		break;
  	}

  	this.filtrosService.enviarFiltrosDatasets(this.filtros).subscribe(
  		response => {
  			this.texto = '';
  			this.datasets = response.json();
  			console.log(this.datasets);
  			for(let i=0; i<this.datasets.length; i++){
  				this.institutionService.getInstituionById(this.datasets[i].institution_id).subscribe(
  					response => {
  						let institution = {
							"country": '',
							"city": ''
						}
						institution = response.json();
  						this.datasets[i].country = institution.country;
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

  public vaciarFiltros(){
  	this.filtros.categoria = 9999;
	this.filtros.pais =  '';
	this.filtros.ciudad = '';
	this.hayCategoria = true;
	this.hayPais = true;
	this.hayCiudad = true;
  }

  public busqueda(){
  	if(this.texto == ""){
  		this.cargarDatasets();
  		this.vaciarFiltros();
  	}else{
	  	this.filtrosService.BusquedaDataset(this.texto).subscribe(
	  		response => {
	  			this.datasets = response.json();
	  			console.log(response.json());
	  			this.vaciarFiltros();
	  			for(let i=0; i<this.datasets.length; i++){
  				this.institutionService.getInstituionById(this.datasets[i].institution_id).subscribe(
  					response => {
  						let institution = {
							"country": '',
							"city": ''
						}
						institution = response.json();
  						this.datasets[i].country = institution.country;
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

}
