import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable,ObservableLike,catchError,throwError } from 'rxjs';
import { serviceModel } from '../models/serviceModel';
import { lang } from '../lang';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    private lang: lang
  ) { }

  get API(): string {
    return `${environment.API}services${this.lang.getLang()}`;
  }

  get AdminAPI(): string {
    return `${environment.API}services`;
  }

  getServices(): Observable<serviceModel[]>{
    return this.http.get<serviceModel[]>(this.API);
  }

  addService(newService: FormData): Observable<serviceModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    console.log(this.AdminAPI);
    console.log(newService);
    return this.http.put<serviceModel>(`${this.AdminAPI}/add`, newService, { headers });
  }

  updateService(updatedService: FormData): Observable<serviceModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.post<serviceModel>(`${this.AdminAPI}/update/${updatedService.get('_id')}`, updatedService, { headers });
  }

  deleteService(serviceName: string): Observable<serviceModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };


    return this.http.delete<serviceModel>(`${this.AdminAPI}/delete/${serviceName}`, { headers });
  }
}
