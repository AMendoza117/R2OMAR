import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { SubactComponent } from './componentes/subact/subact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    VerProyectoComponent,
    ActividadComponent,
    SubactComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
