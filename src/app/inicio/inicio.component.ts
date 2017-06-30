import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpModule, JsonpModule, Headers } from '@angular/http';
import { AppService } from './../service/app.service';
import { SessionService } from './../service/session.service';
import { CategoryService } from './../service/category.service';
import { ImagesService } from './../service/images.service';
import { Globals } from './../app.global';
import { App_categoryService } from './../service/app_category.service';
import { FiltrosService } from './../service/filtros.service';
import { Vote_appService } from './../service/vote_app.service';
import { Funcs } from './../service/funcs.service';

@Component({
  selector: 'inicio',
  providers: [ Globals ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit,AfterViewInit {
  
  private apps = [];
  private categorias = [];
  private images = [];
  private iconos = [];

  //Propiedades para controlar el limit de apps
  private num:number = 6;
  private init:number = 0;
  private hayMas:boolean = false;

  //Propiedad para mostrar la categoria
  private nombre_categoria = '';
  private hayCategoria = true;
  //Propiedad para mostrar el pais
  private nombre_pais = '';
  private hayPais = true;

  //Guardamos el cambio de orden
  private ordenListado = '';

  private userSession = {"name": ''};
  private user:boolean = false;

  private descendente = true;
  private ascendente = false;

  //Propiedad para guardar el texto de de Búqueda
  //de titulo y descripcion
  private texto = "";

  //modelo para los filtros

  private filtros = {
    "categoria": 9999,
    "pais": '',
    "vistas": false,
    "precio": false,
    "media": false,
    "order": 'DESC',
    "num": this.num,
    "init": this.init
  }

  constructor(private appservice:AppService, private sessionService:SessionService, private categoryService:CategoryService, private globals:Globals, private imagesService:ImagesService, private app_categoryService:App_categoryService, private filtrosService:FiltrosService, private vote_appService:Vote_appService, private funcs:Funcs) { 
    this.hayCategoria = true;
    this.sessionService.getUserSession().subscribe(
      response => {
        if(response.status != 204)//Este codigo da cuando el user o la password son incorrectos.
          this.userSession = response.json();
        if(response.status == 200 && this.userSession.name != ''){//Comprobamos que la peticion es correcta y el user se completa
          console.log(this.userSession);
          this.user = true;
        }
      },
      error => {
        console.log(error);
      }
    );
    this.cargarCategorias();
    //this.verMas();
  }

  ngOnChanges(){}

  ngOnInit() {
  	this.getApps();
    this.ordenListado = "eliminar";
  }

  ngAfterViewInit(){
  	console.log('ngAfterViewInit');
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

  public getApps() {
  	 this.appservice.getAppsByLimit(this.num,this.init).subscribe(
  		response => {
  			console.log(response.json());
        this.apps = response.json();
        console.log(this.apps);
        for(let i=0; i<this.apps.length; i++){
           this.imagesService.getImagesById_fotos(this.apps[i].id_fotos).subscribe(
              response => {
                this.images = response.json();
                for(let j=0; j<this.images.length; j++){
                    if(this.images[j].type == "icon"){
                        this.iconos[this.apps[i].id_fotos] = this.globals.HOST + this.images[j].url;
                        console.log(this.iconos[this.apps[i].id_fotos]);
                    }
                }
              },
              error => {

              }
            );
             this.vote_appService.getAverageByApp(this.apps[i].id).subscribe(
               response => {
                 this.apps[i].average = response.text();
                 console.log(this.apps[i].average);
               },
               error => {

               }
             );
        }
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  public vaciarFiltros(){
    this.filtros.categoria = 9999;
    this.filtros.pais =  '';
    this.filtros.vistas =  false;
    this.filtros.precio =  false;
    this.filtros.media = false;

    this.hayCategoria = true;
    this.hayPais = true;
  }

  public busqueda(){
    if(this.texto == ""){
      this.getApps();
      this.hayMas = false;
      this.vaciarFiltros();
    }else{
      this.filtrosService.Busqueda(this.texto).subscribe(
          response => {
              this.apps = response.json();
              this.hayMas = true;
              this.vaciarFiltros();
          },
          error => {

          }
      );
    }
  }

  public verMas(){
    console.log("CAPTURADO");
      this.num = this.num + 6;
      let masApps = [];
      if(!this.hayOrderBy()){
          this.appservice.getAppsByLimit(this.num,this.init).subscribe(
            response => {
                masApps = response.json();
                if(masApps.length - this.apps.length < 6)
                  this.hayMas = true;
                this.apps = response.json();
                console.log(this.apps);
                for(let i=0; i<this.apps.length; i++){
                   this.imagesService.getImagesById_fotos(this.apps[i].id_fotos).subscribe(
                      response => {
                        this.images = response.json();
                        for(let j=0; j<this.images.length; j++){
                            if(this.images[j].type == "icon"){
                                this.iconos[this.apps[i].id_fotos] = this.globals.HOST + this.images[j].url;
                                console.log(this.iconos[this.apps[i].id_fotos]);
                            }
                        }
                      },
                      error => {

                      }
                    );
                   this.vote_appService.getAverageByApp(this.apps[i].id).subscribe(
                     response => {
                       this.apps[i].average = response.text();
                       console.log(this.apps[i].average);
                     },
                     error => {

                     }
                   );
                }

                /*for(let k=0; k<this.apps.length; k++){
                  this.apps.push(this.apps[k]);
                }*/
            },
            error => {

            }
          );
      }else{
        //let masApps = [];
        //this.funcs.copyArray(this.apps,masApps);
        this.enviarFiltros(5,0,0);
        //this.funcs.concatArrays(this.apps,masApps);
      }  
  }

  public reload(){
    window.location.reload();
  }

  public cambiaOrden(){
    if(this.ascendente == true){
      this.ascendente = false;
      this.descendente = true;
      this.filtros.order = 'DESC';
    }else{
      this.ascendente = true;
      this.descendente = false;
      this.filtros.order = 'ASC';
    }
    this.enviarFiltros(5,0,0);
  }

  /*
    "categoria": 9999,
    "pais": '',
    "vistas": false,
    "precio": false,
    "media": false,
    "order": 'DESC'
  */
  public noHayFiltros(){
    if(this.filtros.categoria == 9999 &&
        this.filtros.pais == '' &&
        this.filtros.vistas == false &&
        this.filtros.precio == false &&
        this.filtros.media == false){
          return true;
    }else{
        return false;
    }
  }

  public hayOrderBy() {
      if(this.filtros.vistas == false &&
        this.filtros.precio == false &&
        this.filtros.media == false){
            return false;
      }else{
        return true;
      }
  }

  public hayWhere(){
    if(this.filtros.categoria == 9999 &&
        this.filtros.pais == '' ){
        return false;
    }else{
        return true;
    }
  }

  /*
    0: viene de un click de categoría
    1: viene de cerrar la pestaña de no categoría
    2: viene de un change del input de pais
    3: viene de cerrar la pestaña de no pais
    4: viene de un cambio en el selec de orden
    5: viene de n cambio de ASC o DESC o un click en ver mas con un orden y sin filtros
  */
  public enviarFiltros(num,value,nameCategory){

    this.filtros.num = this.num;
    this.filtros.init = this.init;
    
    switch(num){

      case 0:
        this.hayCategoria = false;
        this.nombre_categoria = nameCategory;
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
        if(value != 'nada'){
          switch(value){
            case 'visitas':
                this.filtros.vistas = true;
                this.filtros.media = false;
                this.filtros.precio = false;
            break;
            case 'media':
                this.filtros.media = true;
                this.filtros.vistas = false;
                this.filtros.precio = false;
            break;
            case 'precio':
                this.filtros.precio = true;
                this.filtros.vistas = false;
                this.filtros.media = false;              
            break;
            case 'eliminar':
                this.filtros.precio = false;
                this.filtros.vistas = false;
                this.filtros.media = false;  
            break;
          }
        }
      break;
      case 5:
        //No hacemos nada
      break;
    }

    if(!this.noHayFiltros()){
      //Si hay un orden y este método se está ejecutando por pulsar más
      this.filtrosService.enviarFiltros(this.filtros).subscribe(
        response => {
          this.texto = '';
          let masApps = response.json();
          if(masApps.length - this.apps.length < 6 && masApps.length != 6)
            this.hayMas = true;
          else
            this.hayMas = false;
          this.apps = response.json();
          console.log(this.apps);
          for(let i=0; i<this.apps.length; i++){
             this.imagesService.getImagesById_fotos(this.apps[i].id_fotos).subscribe(
                response => {
                  this.images = response.json();
                  for(let j=0; j<this.images.length; j++){
                      if(this.images[j].type == "icon"){
                          this.iconos[this.apps[i].id_fotos] = this.globals.HOST + this.images[j].url;
                          console.log(this.iconos[this.apps[i].id_fotos]);
                      }
                  }
                },
                error => {

                }
              );
               this.vote_appService.getAverageByApp(this.apps[i].id).subscribe(
                 response => {
                   this.apps[i].average = response.text();
                   console.log(this.apps[i].average);
                 },
                 error => {

                 }
               );
          }
          if(this.hayWhere()){
            this.hayMas = true;
          }else{
             if(masApps.length - this.apps.length >= 6)
                this.hayMas = false;
          }
        },
        error => {

        }
      );
    }else{
      //this.num = 6;
      //this.init = 0;
      this.getApps();
      this.hayMas = false;
    }

  }

}
