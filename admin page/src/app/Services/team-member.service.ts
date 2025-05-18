import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable,ObservableLike,catchError,throwError } from 'rxjs';
import { teamMemberModel } from '../models/teamMemberModel';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(
    private http: HttpClient
  ) { }

  get API(): string {
    return `${environment.API}team`;
  }

  getTeamMembers(): Observable<teamMemberModel[]>{
    return this.http.get<teamMemberModel[]>(this.API);
  }

  addTeamMember(newTeamMember: FormData): Observable<teamMemberModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.put<teamMemberModel>(`${this.API}/add`, newTeamMember, { headers });
  }

  updateTeamMember(updatedTeamMember: FormData): Observable<teamMemberModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const teamMemberId = updatedTeamMember.get('_id');

    return this.http.post<teamMemberModel>(`${this.API}/update/${teamMemberId}`, updatedTeamMember, { headers });
  }

  deleteTeamMember(teamMemberName: string): Observable<teamMemberModel>{

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    console.log(teamMemberName);
    return this.http.delete<teamMemberModel>(`${this.API}/delete/${teamMemberName}`, { headers });
  }


}
