import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { AdminGuard } from './core/guards/admin.guard';
import { LineGraphComponent } from './line-graph/line-graph.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminConsoleComponent, canActivate: [AdminGuard]},
  { path: 'data', component: LineGraphComponent},
  { path: '**', component: PageNotFoundComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
