import { Routes,RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
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

const appRoutes = [
	{ path: '', component: InicioComponent, },
	{ path: 'login', component: LoginComponent, },
	{ path: 'app', component: AppsComponent,},
	{ path: 'app/:id', component: EditAppComponent,},
	{ path: 'app-detalle/:id', component: AppDetalleComponent,},
	{ path: 'dataset-detalle/:id', component: DatasetDetalleComponent,},
	{ path: 'mis-apps', component: MisAppsComponent,},
	{ path: 'datasets', component: DatasetsComponent,},
	{ path: 'estadisticas', component: EstadisticasComponent,},
	{ path: 'app-estadisticas', component: AppEstadisticasComponent,},
	{ path: 'dataset-estadisticas', component: DatasetEstadisticasComponent,},
	{ path: 'registro', component: RegistroComponent,},
	{ path: 'editar-perfil', component: EditarRegistroComponent,},
	{ path: 'vista-usuario/:id', component: VistaUsuarioComponent,}
]

export const routing  = RouterModule.forRoot(appRoutes);