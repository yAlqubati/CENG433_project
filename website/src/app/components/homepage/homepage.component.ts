import { Component, Input,Injectable } from '@angular/core';
import{TeamCardsComponent} from '../../share/team-cards/team-cards.component';
import { ServiceCardsComponent } from '../../share/service-cards/service-cards.component';
import{HeroComponent} from '../../share/landing/hero/hero.component';
import { LogosComponent } from '../../share/landing/logos/logos.component';
import { EclipsePurpleComponent } from '../../share/eclipse-purple/eclipse-purple.component';
import { EclipseBlueComponent } from '../../share/eclipse-blue/eclipse-blue.component';
import { OurProjectCardComponent } from '../../share/our-project-card/our-project-card.component';
import { projectDetailsModel } from '../../core/models/project-card-model';
import { NgFor } from '@angular/common';
import { OurProjectComponent } from '../our-project/our-project.component';
import { environment } from '../../core/env/Environment.API';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { lang } from '../../share/lang';
import { CommonModule } from '@angular/common';



@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule, HeroComponent, LogosComponent, EclipsePurpleComponent, EclipseBlueComponent, LogosComponent, OurProjectCardComponent,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent 
{
  constructor(private http: HttpClient, private langService: lang) {}
  projects: projectDetailsModel[] = [];
  currentLang:string=''
  get ApiUrl() {
    this.currentLang =this.langService.getLang()
    if(this.currentLang==='ar')
    {
      return `${environment.API}/projects/ar`;

    }
    return `${environment.API}/projects`;
  }
  
  getImageUrl(imagePath: string): string {
    return `${environment.API}/controllers/assets/project-images/${imagePath}`;
  }
  get getProjects(): Observable<projectDetailsModel[]> {
    return this.http.get<projectDetailsModel[]>(this.ApiUrl).pipe(
      map((data: projectDetailsModel[]) =>
        data.slice(0, 2).map(item => ({
          ...item,
          image: item.image ? this.getImageUrl(item.image) : 'assets/img/nerdLan.png',
        }))
      )
    );
  }
  ngOnInit() {
    this.getProjects.subscribe({
      next: (data) => {
        // console.log('Data received:', data);
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      },
    });
  }
  // enData: title:string, description:string
  // [
  //   {

  //   }
  // ]
  // arData

  // getrouter()
  // {
  //   return AppRoutingModule.getRoutes();
  // }


 
}
