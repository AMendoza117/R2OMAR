import { Employee } from './../../interface/employee.model';
// ver-proyecto.component.ts
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
  projectData: ProjectData[];
  responsibles: Responsible[];
  employee: Employee[];
  idProject: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idDocumento = +params.get('id'); 
      this.idProject = +params.get('id'); 
      if (!isNaN(this.idDocumento)) {
        this.loadPDF(this.idDocumento);
      }
      if (!isNaN(this.idProject)) {
        this.loadPDF(this.idProject);
      }
    });
    console.log("Datos de PDF: ", this.verDocumento);
    this.enRevission(this.idDocumento);
    this.loadResponsables();
    this.loadEmployee(this.idProject);
    this.loadProject(this.idProject);

  }


  loadPDF(idDocumento: number) {
    this.apiService.getPDF(idDocumento).subscribe(
      (verDocumento: Documento) => {
        this.verDocumento = verDocumento;
        console.log("Datos del pdfaa: ", this.verDocumento);
      },
      (error) => {
        console.error('Error al cargar PDF: ', error)
      }
    )
  }

  loadPDF2(idProject: number) {
    this.apiService.getPDF2(idProject).subscribe(
      (verDocumento: Documento) => {
        this.verDocumento = verDocumento;
        console.log("Datos del pdfaa: ", this.verDocumento);
      },
      (error) => {
        console.error('Error al cargar PDF: ', error)
      }
    )
  }

  enRevission(idDocumento: number): void {
    this.apiService.enRevision(idDocumento).subscribe(
      (response) => {
        this.loadPDF(this.idDocumento);
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    )
  }

  aceptado(): void {
    const idDocumento = this.idDocumento;
    this.apiService.aceptado(idDocumento).subscribe(
      (response) => {
        if (response && response.success) {
          // Enviar el correo electrónico después de agregar el stakeholder
          this.apiService.enviarCorreo(this.verDocumento).subscribe(
            (correoResponse) => {
              if (correoResponse && correoResponse.success) {
                console.log('Correo electrónico enviado con éxito.');
              } else {
                console.error('Error al enviar el correo electrónico.');
              }
            },
            (correoError) => {
              console.error('Error en la solicitud para enviar el correo electrónico: ', correoError);
            }
          );
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Error al agregar stakeholder.');
        }
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    )
  }

  rechazado(): void {
    const idDocumento = this.idDocumento;
    this.apiService.rechazado(idDocumento).subscribe(
      (response) => {
        if (response && response.success) {
          // Enviar el correo electrónico después de agregar el stakeholder
          this.apiService.enviarCorreo2(this.verDocumento).subscribe(
            (correoResponse) => {
              if (correoResponse && correoResponse.success) {
                console.log('Correo electrónico enviado con éxito.');
              } else {
                console.error('Error al enviar el correo electrónico.');
              }
            },
            (correoError) => {
              console.error('Error en la solicitud para enviar el correo electrónico: ', correoError);
            }
          );
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Error al agregar stakeholder.');
        }
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    )
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

  loadEmployee(idProject) {
    this.apiService.loadEmploye(idProject).subscribe(
      (employee: Employee[]) => {
        this.employee = employee;
      },
      (error) => {
        console.error('Error al cargar responsables:', error);
      }
    );
  }

  loadProject(idProject){
    this.apiService.getProjectData(this.idProject).subscribe(
      (data: any) => {
        this.projectData = data;
      },
      (error) => {
        console.error('Error al cargar datos del proyecto:', error);
      }
    );
  }
}



