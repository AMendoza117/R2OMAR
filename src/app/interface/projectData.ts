import { Activity } from "./activity.model";
import { Employee } from "./employee.model";
import { Project } from "./project.model";
import { Responsible } from "./responsible.model";

export interface ProjectData {
    projects: Project[];
    responsible: Responsible;
    activity: Activity[];
    employee: Employee[];
    // Agrega otras interfaces según sea necesario para otras tablas
  }