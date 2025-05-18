import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable,ObservableLike,catchError,throwError } from 'rxjs';
import { projectModel } from '../models/projectModel';
import { lang } from '../lang';

@Injectable({
  providedIn: 'root'
})
export class ProjectService{

  constructor(
    private http: HttpClient,
    private lang: lang
  ) { }

  get API(): string {
    return `${environment.API}projects${this.lang.getLang()}`;
  }

  get AdminAPI(): string {
    return `${environment.API}projects`;
  }

  getProjects(): Observable<projectModel[]>{
    return this.http.get<projectModel[]>(this.API);
  }

  addProject(newProject: FormData): Observable<projectModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    
    return this.http.put<projectModel>(`${this.AdminAPI}/add`, newProject, { headers });
  }

  updateProject(updatedProject: FormData): Observable<projectModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const projectId = updatedProject.get('_id');
    return this.http.post<projectModel>(`${this.AdminAPI}/update/${projectId}`, updatedProject, { headers });
  }

  deleteProject(projectName: string): Observable<projectModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.delete<projectModel>(`${this.AdminAPI}/delete/${projectName}`, { headers });
  }

}


