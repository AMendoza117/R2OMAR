import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { SubactComponent } from './componentes/subact/subact.component';


const routes: Routes = [
  {path: '',redirectTo:'dashboard', pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'ver-proyecto/:id',component:VerProyectoComponent},
  {path:'actividad',component:ActividadComponent},
  {path:'subact',component:SubactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
