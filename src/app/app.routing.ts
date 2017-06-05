import { Routes,RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { AppDetalleComponent } from './app-detalle/app-detalle.component';
import { DatasetDetalleComponent } from './dataset-detalle/dataset-detalle.component';

const appRoutes = [
	{ path: '', component: InicioComponent, },
	{ path: 'login', component: LoginComponent, },
	{ path: 'app', component: AppsComponent,},
	{ path: 'app/:id', component: EditAppComponent,},
	{ path: 'app-detalle/:id', component: AppDetalleComponent,},
	{ path: 'dataset-detalle/:id', component: DatasetDetalleComponent,},
	{ path: 'datasets', component: DatasetsComponent,}
]

export const routing  = RouterModule.forRoot(appRoutes);