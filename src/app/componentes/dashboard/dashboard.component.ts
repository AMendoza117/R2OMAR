import { Documento } from './../../Models/Documento.model';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Project } from 'src/app/interface/project.model';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: Project[];
  numPDFs: number;
  numPDFsPendientes: number;
  numPDFsEnRevision: number;
  documentosPendientes: Documento[];
  documentosEnRevision: Documento[];
  documentosAceptados: Documento[];
  documentosRechazados: Documento[];

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.update();
    
  }

  // Implementar el método update para refrescar la información
  update(): void {
    this.loadPDFs();
  }

  loadPDFs() {
    this.apiService.loadPDFs().subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Respuesta del servicio:', response.data);
          this.projects = response.data;
        } else {
          console.error('Error en la respuesta del servicio:', response);
        }
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      },
      () => {
        console.log('Llamada al servicio completada.');
      }
    );
  }
  
  
  redirectToPDF(projects: Project) {
    if (projects && projects.idProject) {
      const url = ['ver-proyecto', projects.idProject];
      this.router.navigate(url);
    } else {
      console.error('ID de proyecto indefinido. No se puede navegar.');
    }
  }

}


