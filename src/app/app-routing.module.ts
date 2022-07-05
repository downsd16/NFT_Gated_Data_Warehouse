import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},                          //, canActivate: [AuthGuard]
  //{ path: 'data', component: },       ADD FOR DATA WAREHOUSE ROUTE
  //{ path: 'market', component: },     ADD FOR MARKETPLACE ROUTE
  { path: '**', component: PageNotFoundComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
