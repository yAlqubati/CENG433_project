import {  Routes } from '@angular/router';
import {  RouterModule } from '@angular/router';
import {  RouterOutlet } from '@angular/router';
import {  RouterLink } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { authGuard } from './Guards/auth.guard';
import { LogInComponent } from  './Components/log-in/log-in.component';
import { ServicesPageComponent } from './Components/services-page/services-page.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProjectsPageComponent } from './Components/projects-page/projects-page.component';
import { TeamMembersPageComponent } from './Components/team-members-page/team-members-page.component';
import { AdminsComponent } from './Components/admins/admins.component';

export const routes: Routes = [
    { path: 'login', component: LogInComponent  },  
    { path: 'home', component: HomePageComponent , canActivate: [authGuard] },
    { path: 'services', component: ServicesPageComponent , canActivate: [authGuard] },
    { path: 'projects', component: ProjectsPageComponent ,  canActivate: [authGuard] },
    { path: 'team-members', component: TeamMembersPageComponent , canActivate: [authGuard] },
    { path: 'admins', component: AdminsComponent , canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }  
  ];
  
