import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LogInComponent } from './Components/log-in/log-in.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { routes } from './app.routes';
import { TeamMembersPageComponent } from './Components/team-members-page/team-members-page.component';
import { ServicesPageComponent } from './Components/services-page/services-page.component';
import { ProjectsPageComponent } from './Components/projects-page/projects-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LogInComponent,
    AdminsComponent,
    HttpClientModule,
    RouterModule,
    TeamMembersPageComponent,
    ServicesPageComponent,
    ProjectsPageComponent,
    AdminsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected from styleUrl to styleUrls
})



export class AppComponent {
  title = 'BasitaAdminPanel';
}