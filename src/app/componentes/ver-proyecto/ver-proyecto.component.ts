import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Responsible } from 'src/app/interface/responsible.model';
import { ProjectData } from 'src/app/interface/projectData';
import { Item } from 'src/app/interface/item.model';
import { Activity } from 'src/app/interface/activity.model';
import { Employee } from 'src/app/interface/employee.model';
import { Subactivity } from 'src/app/interface/subactivity.model';


@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {
  projectData: ProjectData;
  projectD: ProjectData[];
  responsibles: Responsible[];
  employees: Employee[];
  activitys: Activity[];
  item: Item[];
  idProject: number;
  selectedEmployee: number; 
<<<<<<< Updated upstream

  nuevaActividad: Activity = {
    idAcitvity: null,
=======
   nuevaActividad: Activity = {
    idActivity: null,
>>>>>>> Stashed changes
    nameAct: '',
    initialDate: '',
    finisDate: '',
    responsible: null,
    idProject: null,
    item: null
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

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

  loadEmployees() {
    if (this.projectData && this.projectData.employee) {
      this.employees = this.projectData.employee;
    }
    console.log("datos de empleados", this.employees)
  }

  loadActivity() {
    if (this.projectData && this.projectData.activity) {
      this.activitys = this.projectData.activity;
    }
    console.log("datos de activity: ",this.activitys);
  }

 

  loadProject(idProject: number){
    this.apiService.getProjectData(idProject).subscribe(
      (data: ProjectData) => {
        this.projectData = data;
<<<<<<< Updated upstream
        this.loadEmployees(); 
        this.loadActivity();
=======
        this.loadEmployees();
        this.loadActivities(idProject); // Agregar esta línea para cargar las actividades
>>>>>>> Stashed changes
        console.log("Datos del loadProject", this.projectData);
        
      },
      (error) => {
        console.error('Error al cargar datos del proyecto:', error);
      }
    );
  }
  
  loadActivities(idProject: number) {
    this.apiService.getProjectData(idProject).subscribe(
      (projectData: ProjectData) => {
        this.projectData = projectData;
        console.log('Datos del proyecto cargados correctamente:', projectData);
        // Otros pasos que puedas necesitar
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

  agregarActividad() {
    // Obtener el ID del proyecto desde la ruta
    const idProyecto = this.idProject;
    // Agregar el nuevo stakeholder al proyecto
    this.apiService.addActivity(idProyecto, this.nuevaActividad).subscribe(
      (response) => {
        if (response && response.success) {
          // Enviar el correo electrónico después de agregar el stakeholder
         this.apiService.enviarCorreo2(idProyecto).subscribe(
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
          this.loadProject(this.idProject);
        } else {
          console.error('Error al agregar stakeholder.');
        }
      },
      (error) => {
        console.error('Error en la solicitud para agregar stakeholder: ', error);
      }
    );
  }
<<<<<<< Updated upstream
  
  nuevaSubactividad: Subactivity = {
    idSubAct: null,
    nameSub: '',
    nameRes: null,
    idAct: null,
  };

  agregarSubactividad(): void {
    const idProyecto = this.idProject;
    // Agregar la nueva subactividad a la actividad
    this.apiService.addSubactivity(this.nuevaSubactividad).subscribe(
      (response) => {
        if (response && response.success) {
          console.log('Subactividad añadida exitosamente!');
          this.apiService.enviarCorreo2(idProyecto).subscribe(
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
          // Actualizar la lista de actividades después de agregar la subactividad
          this.loadProject(this.idProject);
        } else {
          console.error('Error al añadir subactividad.');
        }
      },
      (error) => {
        console.error('Error en la solicitud para añadir subactividad: ', error);
      }
    );
  }
    
=======
     
>>>>>>> Stashed changes
}
