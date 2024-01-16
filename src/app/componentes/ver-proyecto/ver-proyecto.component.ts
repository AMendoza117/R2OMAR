import { Employee } from './../../interface/employee.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Responsible } from 'src/app/interface/responsible.model';
import { ProjectData } from 'src/app/interface/projectData';
import { Item } from 'src/app/interface/item.model';
import { Activity } from 'src/app/interface/activity.model';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {
  projectData: ProjectData;
  responsibles: Responsible[];
  employees: Employee[];
  item: Item[];
  idProject: number;
  selectedEmployee: number; 
  newActivity: any = {
    title: '',
    encargadoId: null,
    recursoId: null,
    inicio: '',
    fin: ''
  };
  activities: Activity;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idProject = +params.get('id'); 
      if (!isNaN(this.idProject)) {
        this.loadProject(this.idProject);
      }
    });

    this.loadResponsables();
    this.loadItem();
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

  /*loadEmployees() {
    this.employees = this.projectData.employee;
  }*/
  loadEmployees() {
    if (this.projectData && this.projectData.employee) {
      this.employees = this.projectData.employee;
    } else {
      this.employees = [];
    }
  }
  

  loadProject(idProject: number){
    this.apiService.getProjectData(idProject).subscribe(
      (data: ProjectData) => {
        this.projectData = data;
        this.loadEmployees(); 
        console.log("Datos del loadProject", this.projectData);
      },
      (error) => {
        console.error('Error al cargar datos del proyecto:', error);
      }
    );
  }

  loadItem() {
    this.apiService.getItem().subscribe(
      (item: Item[]) => {
        this.item = item;
      },
      (error) => {
        console.error('Error al cargar responsables:', error);
      }
    );
  }

  addNewActivity() {
    // Validar que los campos requeridos estén completos antes de agregar la actividad
    if (!this.newActivity.title || !this.newActivity.encargadoId || !this.newActivity.recursoId || !this.newActivity.inicio || !this.newActivity.fin) {
      console.log('Por favor, complete todos los campos antes de guardar.');
      return;
    }
  
    // Asegúrate de que this.projectData.activities esté inicializado antes de usarlo.
    if (!this.projectData.activities) {
      this.projectData.activities = [];
    }
  
    // Agregar la nueva actividad al arreglo de actividades
    this.projectData.activities.push({
      title: this.newActivity.title,
      encargadoId: this.newActivity.encargadoId,
      recursoId: this.newActivity.recursoId,
      inicio: this.newActivity.inicio,
      fin: this.newActivity.fin
      // Añade otras propiedades según sea necesario
    });
  
    // Resetear el formulario
    this.newActivity = {
      title: '',
      encargadoId: null,
      recursoId: null,
      inicio: '',
      fin: ''
    };
  
    // Guardar la nueva actividad en el backend utilizando tu servicio de API
    this.apiService.addActivity(this.newActivity).subscribe(response => {
      if (response.success) {
        console.log('¡Actividad añadida exitosamente!');
      } else {
        console.error('Error al añadir actividad:', response.error);
      }
    });
  }
  

  /*addNewActivity() {
    // Validar que los campos requeridos estén completos antes de agregar la actividad
    if (!this.newActivity.title || !this.newActivity.encargadoId || !this.newActivity.recursoId || !this.newActivity.inicio || !this.newActivity.fin) {
      console.log('Por favor, complete todos los campos antes de guardar.');
      return;
    }

    // Agregar la nueva actividad al arreglo de actividades
    this.projectData.activities.push({
      title: this.newActivity.title,
      encargadoId: this.newActivity.encargadoId,
      recursoId: this.newActivity.recursoId,
      inicio: this.newActivity.inicio,
      fin: this.newActivity.fin
      // Añade otras propiedades según sea necesario
    });

    // Resetear el formulario
    this.newActivity = {
      title: '',
      encargadoId: null,
      recursoId: null,
      inicio: '',
      fin: ''
    };

    // Guardar la nueva actividad en el backend utilizando tu servicio de API
    this.apiService.addActivity(this.newActivity).subscribe(response => {
      if (response.success) {
        console.log('¡Actividad añadida exitosamente!');
      } else {
        console.error('Error al añadir actividad:', response.error);
      }
    });
  }*/
}


