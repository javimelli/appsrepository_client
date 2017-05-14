import { Routes,RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';

const appRoutes = [
	{ path: '', component: InicioComponent, },
	{ path: 'login', component: LoginComponent, },
	{ path: 'app', component: AppsComponent,}
]

export const routing  = RouterModule.forRoot(appRoutes);