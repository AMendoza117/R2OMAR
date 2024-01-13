import { Employee } from './../../interface/employee.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Documento } from 'src/app/Models/Documento.model';
import { Responsible } from 'src/app/interface/responsible.model';
import { ProjectData } from 'src/app/interface/projectData';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {
  verDocumento: Documento;
  idDocumento: number;
  projectData: ProjectData;
  responsibles: Responsible[];
  employees: Employee[];
  idProject: number;
  selectedEmployee: number; 

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idDocumento = +params.get('id'); 
      this.idProject = +params.get('id'); 
      if (!isNaN(this.idDocumento)) {
        this.loadPDF(this.idDocumento);
      }
      if (!isNaN(this.idProject)) {
        this.loadProject(this.idProject);
      }
    });

    this.loadResponsables();
  }

  loadPDF(idDocumento: number) {
    this.apiService.getPDF(idDocumento).subscribe(
      (verDocumento: Documento) => {
        this.verDocumento = verDocumento;
        console.log("Datos del PDF: ", this.verDocumento);
      },
      (error) => {
        console.error('Error al cargar PDF: ', error);
      }
    );
  }

  enRevission(idDocumento: number): void {
    this.apiService.enRevision(idDocumento).subscribe(
      (response) => {
        this.loadPDF(this.idDocumento);
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    );
  }

  loadResponsables() {
    this.apiService.loadResponsables().subscribe(
      (responsibles: Responsible[]) => {
        this.responsibles = responsibles;
      },
      (error) => {
        console.error('Error al cargar responsables:', error);
      }
    );
  }

  loadEmployees() {
    // Asegúrate de ajustar la propiedad correcta según la estructura de projectData
    // Supongo que el array de empleados está en projectData.employee
    this.employees = this.projectData.employee;
  }

  loadProject(idProject: number){
    this.apiService.getProjectData(idProject).subscribe(
      (data: ProjectData) => {
        this.projectData = data;
        this.loadEmployees(); // Llama a loadEmployees para llenar la propiedad employees
        console.log("Datos del loadProject", this.projectData);
      },
      (error) => {
        console.error('Error al cargar datos del proyecto:', error);
      }
    );
  }
}
