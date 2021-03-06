import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { Ng2UploaderModule } from 'ng2-uploader';
import { ChartsModule } from 'ng2-charts';


//COMPONENTES 
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { AppsComponent } from './apps/apps.component';
import { IconComponent } from './icon/icon.component';
import { CapturesComponent } from './captures/captures.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { AppDetalleComponent } from './app-detalle/app-detalle.component';
import { DatasetDetalleComponent } from './dataset-detalle/dataset-detalle.component';
import { MisAppsComponent } from './mis-apps/mis-apps.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AppEstadisticasComponent } from './app-estadisticas/app-estadisticas.component';
import { DatasetEstadisticasComponent } from './dataset-estadisticas/dataset-estadisticas.component';
import { RegistroComponent } from './registro/registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';

//SERVICIOS
import { SessionService } from './service/session.service';
import { CookiesService } from './service/cookies.service';
import { AppService } from './service/app.service';
import { UploadFiles } from './service/upload.service';
import { CategoryService } from './service/category.service';
import { PlatformService } from './service/platform.service';
import { DataSetService } from './service/dataset.service';
import { InstitutionService } from './service/institution.service';
import { App_categoryService } from './service/app_category.service';
import { App_PlatformService } from './service/app_platform.service';
import { Dataset_appService } from './service/dataset_app.service';
import { ImagesService } from './service/images.service';
import { FiltrosService } from './service/filtros.service';
import { Vote_appService } from './service/vote_app.service';
import { Funcs } from './service/funcs.service';
import { UserService } from './service/user.service';
import { CommentaryService } from './service/commentary.service';
import { Vote_commentService } from './service/vote_comment.service';
import { EstadisticasService } from './service/estadisticas.service';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    LoginComponent,
    FooterComponent,
    InicioComponent,
    AppsComponent,
    IconComponent,
    CapturesComponent,
    EditAppComponent,
    DatasetsComponent,
    AppDetalleComponent,
    DatasetDetalleComponent,
    MisAppsComponent,
    EstadisticasComponent,
    AppEstadisticasComponent,
    DatasetEstadisticasComponent,
    RegistroComponent,
    EditarRegistroComponent,
    VistaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2UploaderModule,
    ChartsModule
  ],
  providers: [SessionService,CookiesService,AppService,UploadFiles,CategoryService,PlatformService,DataSetService,InstitutionService,App_categoryService,App_PlatformService,Dataset_appService,ImagesService,FiltrosService,Vote_appService,Funcs,UserService,CommentaryService, Vote_commentService,EstadisticasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
