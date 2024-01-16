import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObservableService } from './services/observable.service';
import { Documento } from './Models/Documento.model';
import { Project } from './interface/project.model';
import { Responsible } from './interface/responsible.model';
import { ProjectData } from './interface/projectData';
import { Item } from './interface/item.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private observableService: ObservableService) { }

  // Método para realizar una solicitud GET a una API en el backend.
  public get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // Método para realizar una solicitud POST a una API en el backend.
  public post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }

  loadPDFs(): Observable<Project[]> {
    const url = `${this.apiUrl}/api/getProyectos.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Project[]>(url, { headers });
  }

  getPDF(idDocumento: number): Observable<Documento> {
    const url = `${this.apiUrl}/api/proyectoById.php?idProject=${idDocumento}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Documento>(url, { headers });
  }

  loadResponsables(): Observable<Responsible[]> {
    const url = `${this.apiUrl}/api/loadResponsables.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Responsible[]>(url, { headers });
  }
  
  enviarCorreo(documento: Documento): Observable<any> {
    const url = `${this.apiUrl}/api/enviarEmail.php`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, JSON.stringify(documento), { headers, withCredentials: true });
  }

  enviarCorreo2(documento: Documento): Observable<any> {
    const url = `${this.apiUrl}/api/enviarEmail2.php`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, JSON.stringify(documento), { headers, withCredentials: true });
  }

  getProjectData(idProject: number): Observable<ProjectData> {
    const url = `${this.apiUrl}/api/proyectoById.php?idProject=${idProject}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ProjectData>(url, { headers });
  }

  getItem(): Observable<Item[]> {
    const url = `${this.apiUrl}/api/getRecursos.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Item[]>(url, { headers });
  }

  addActivity(activityData: any): Observable<any> {
    const url = `${this.apiUrl}/api/regsitrarActividad.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, activityData, { headers });
  }

  addSubactivity(subactivyData:any): Observable<any>{
    const url = `${this.apiUrl}/api/regsitrarActividad.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, subactivyData, { headers });
  }
}
