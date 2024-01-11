import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';


const routes: Routes = [
  {path: '',redirectTo:'dashboard', pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'ver-proyecto/:id',component:VerProyectoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
