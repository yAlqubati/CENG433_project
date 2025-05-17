import { Component,Injectable } from '@angular/core';
import {TeamCardsComponent} from '../../share/team-cards/team-cards.component';
import { NgFor } from '@angular/common';
import {TeamModel} from '../../core/models/team-model';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../core/env/Environment.API';
import { HttpClient } from '@angular/common/http';
import { Observable, tap,map } from 'rxjs';
import { EclipsePurpleComponent } from '../../share/eclipse-purple/eclipse-purple.component';
import { EclipseBlueComponent } from '../../share/eclipse-blue/eclipse-blue.component';
import { lang } from '../../share/lang';
import { ShareDataModel } from '../../core/models/ShareDataModel';
import { HomepageModel } from '../../core/models/HomepageModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [TeamCardsComponent, NgFor, HttpClientModule, EclipseBlueComponent, EclipsePurpleComponent,CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
@Injectable({
  providedIn: 'root',
})
export class TeamComponent {
  currentLang:string=''
  constructor(private http: HttpClient, private langService :lang) {}

 teamMembers!: TeamModel[] 
  get ApiUrl() {
    this.currentLang =this.langService.getLang()
    // if(this.currentLang==='ar')
    // {
    //   return `${environment.API}/team/ar`; 
    // }

      return `${environment.API}/our-team`; 
  }
  getImageUrl(imagePath: string): string {
    return `${environment.API}/controllers/assets/team-images/${imagePath}`;
  }

  get getTeam(): Observable<TeamModel[]> {
    return this.http.get<TeamModel[]>(this.ApiUrl).pipe(
           // Log the raw data
          map((projects: TeamModel[]) =>
            projects.map(project => ({
              ...project,
              image: project.image ? this.getImageUrl(project.image) : 'assets/img/nerdLan.png',
            }))
          )
        );
      }
 

  ngOnInit() {
    this.getTeam.subscribe({
      next: (data) => {
        // console.log('Data received:', data);
        this.teamMembers = data;
      },
      error: (error) => {
        console.error('Error fetching team:', error);
      },
    });
  }



  enData: ShareDataModel[] = [
    {
      label: 'VISION',
      title: 'Innovating the Future of Technology',
      description: `We aim to redefine the digital landscape by developing cutting-edge solutions that empower businesses and individuals. 
      Through innovation, dedication, and expertise, we transform ideas into reality, paving the way for a smarter and more connected world.`
    }
  ];
  
  arData: ShareDataModel[] = [
    {
      label: 'رؤيتنا',
      title: 'نبتكر مستقبل التكنولوجيا',
      description: `نهدف إلى إعادة تعريف المشهد الرقمي من خلال تطوير حلول متقدمة تمكّن الشركات والأفراد. 
      من خلال الابتكار والتفاني والخبرة، نحول الأفكار إلى واقع، ونمهد الطريق لعالم أكثر ذكاءً وترابطًا.`
    }
  ];
  
  get visionContent() {
    return this.currentLang === 'ar' ? this.arData : this.enData;
  }

  EnteamData:HomepageModel[]=[
    {
      title: 'Teams',
      description: 'A Team Built on Expertise and Passion'
    }
  ]
  ArTeamData:HomepageModel[]=[
 
      {
        title: 'الفريق',
        description: 'فريق مبني على الخبرة والشغف'
      }
    
  ]

  get TeamData()
  {
    return this.currentLang==='ar'? this.ArTeamData: this.EnteamData
  }

//  = [
//     {
//       name: 'Mohamed',
//       position: 'CEO of Uncle Yahya and Nerd',
//       image: 'assets/img/mohamed.png',  
//       description: 'عم يحيى و النيرد',
//       github: 'https://github.com/yhyimm',
//       linkedIn: '',
//       _id: '5f9b1b3b7f3b3b0017f3b3b3',
//       orderOfDisplay: 1
//     },
//     {
//       name: 'Karim',
//       position: 'CEO of Uncle Yahya and Nerd',
//       image: 'assets/img/Karim.png',
//       description: 'عم يحيى و النيرد',
//       github: 'https://github.com/yhyimm',
//       linkedIn: '',
//       _id: '5f9b1b3b7f3b3b0017f3b3b3',
//       orderOfDisplay: 1
      
//     },
//     {
//       name: 'Its The Nerd',
//       position: 'CEO of nothingness',
//       image: 'assets/img/nerdLan.png', 
//       description: 'useless Coomer + leader of a Big simp army',
//       github: 'https://github.com/yhyimm',
//       linkedIn: '',
//       _id: '5f9b1b3b7f3b3b0017f3b3b3',
//       orderOfDisplay: 1
//     },
//     {
//       name: 'Yahya',
//       position: 'CEO of simpeness',
//       image: 'assets/img/yahya.png',
//       description: 'useless Coomer + leader of a Big simp army',
//       github: 'https://github.com/yhyimm',
//       linkedIn: '',
//       _id: '5f9b1b3b7f3b3b0017f3b3b3',
//       orderOfDisplay: 1
//     },
//     {
//       name: 'Yahya',
//       position: 'CEO of simpeness',
//       image: 'assets/img/yahya.png',
//       description: 'useless Coomer + leader of a Big simp army',
//       github: 'https://github.com/yhyimm',
//       linkedIn: '',
//       _id: '5f9b1b3b7f3b3b0017f3b3b3',
//       orderOfDisplay: 1
//     },
    
//   ];





}
