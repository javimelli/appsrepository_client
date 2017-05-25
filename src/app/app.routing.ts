import { Routes,RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { EditAppComponent } from './edit-app/edit-app.component';

const appRoutes = [
	{ path: '', component: InicioComponent, },
	{ path: 'login', component: LoginComponent, },
	{ path: 'app', component: AppsComponent,},
	{ path: 'app/:id', component: EditAppComponent,}
]

export const routing  = RouterModule.forRoot(appRoutes);