import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { adminModel } from '../models/adminModel';
import { Token } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  static isAuthenticated: boolean;

  constructor(
    private http: HttpClient
  ) { }
  
  get AdminAPI(): string {
    return `${environment.API}admin`;
  }

  getAdmins(): Observable<adminModel[]>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.get<adminModel[]>(`${this.AdminAPI}`, { headers });
  }

  authAdmin(admin: adminModel): Observable<{ token: string }> {
    const body = {
      username: admin.username,
      password: admin.password
    };
    
    console.log(body);
    // The response contains only the token
    return this.http.post<{ token: string }>(`${this.AdminAPI}/authenticate`, body);
  }


  

  addAdmin(newAdmin: FormData): Observable<adminModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    

    return this.http.post<adminModel>(`${this.AdminAPI}/add`, newAdmin, { headers });
  }

  updateAdminPassword(updatedAdmin: FormData): Observable<adminModel>{
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.put<adminModel>(`${this.AdminAPI}/update`, updatedAdmin, { headers });
  }

  deleteAdmin(adminUsername: string): Observable<adminModel>{
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.delete<adminModel>(`${this.AdminAPI}/delete/${adminUsername}`, { headers });
  }
}
