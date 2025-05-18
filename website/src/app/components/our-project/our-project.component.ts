import { Component, Injectable } from '@angular/core';
import { OurProjectCardComponent } from '../../share/our-project-card/our-project-card.component';
// import { NgFor } from '@angular/common';
import { projectDetailsModel } from '../../core/models/project-card-model';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../core/env/Environment.API';
import { EclipseBlueComponent } from '../../share/eclipse-blue/eclipse-blue.component';
import { EclipsePurpleComponent } from '../../share/eclipse-purple/eclipse-purple.component';
import { tap } from 'rxjs/operators'; // Ensure to import tap
import { lang } from '../../share/lang';
import { CommonModule } from '@angular/common';
// import { HomepageModel } from '../../core/models/HomepageModel';
import { ShareDataModel } from '../../core/models/ShareDataModel';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-our-project',
  standalone: true,
  imports: [OurProjectCardComponent,HttpClientModule,EclipseBlueComponent,EclipsePurpleComponent,CommonModule],
  templateUrl: './our-project.component.html',
  styleUrl: './our-project.component.css'
})
export class OurProjectComponent {
  constructor(private http: HttpClient, private lanservice: lang) {}
  projects: projectDetailsModel[] = [];
  currentLang:string=''

  get ApiUrl() {
     this.currentLang=this.lanservice.getLang()
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
       // Log the raw data
      map((projects: projectDetailsModel[]) =>
        projects.map(project => ({
          ...project,
          image: project.image ? this.getImageUrl(project.image) : 'assets/img/nerdLan.png',
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
  enData: ShareDataModel[] = [
    {
      label: 'Our Projects',
      title: 'Projects That Speak for Themselves',
      description: `From AI-powered platforms to scalable web solutions, our projects embody innovation and precision. 
      We specialize in crafting tailored solutions that elevate businesses, ensuring efficiency, security, and a seamless user experience.`
    }
  ];

  // Arabic data
  arData: ShareDataModel[] = [
    {
      label: 'مشاريعنا',
      title: 'مشاريع تتحدث عن نفسها',
      description: `من المنصات المدعومة بالذكاء الاصطناعي إلى حلول الويب القابلة للتطوير، تجسد مشاريعنا الابتكار والدقة.
      نحن متخصصون في تصميم حلول مخصصة ترتقي بالأعمال، مع ضمان الكفاءة والأمان وتجربة مستخدم سلسة.`
    }
  ];


  get content()
  {
    return this.currentLang === 'ar' ? this.arData : this.enData;
  }



  // projects: projectDetailsModel[] = [
  
  //   {
  //     briefDescription: 'UI/UX Design',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'design',
  //     lang: 'en',
  //     orderOfDisplay: 1,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'Web Development',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'web',
  //     lang: 'en',
  //     orderOfDisplay: 2,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'Mobile Development',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'mobile',
  //     lang: 'en',
  //     orderOfDisplay: 3,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'Digital Marketing',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'marketing',
  //     lang: 'en',
  //     orderOfDisplay: 4,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'UI/UX Design',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'design',
  //     lang: 'en',
  //     orderOfDisplay: 5,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'Web Development',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'web',
  //     lang: 'en',
  //     orderOfDisplay: 6,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'Mobile Development',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'mobile',
  //     lang: 'en',
  //     orderOfDisplay: 7,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  //   {
  //     briefDescription: 'Web Development',
  //     image: 'assets/img/ourPorjectCard.jpeg',
  //     detailedDescription: 'We build designs that serve your business needs.',
  //     projectName: 'web',
  //     lang: 'en',
  //     orderOfDisplay: 2,
  //     _id: '60f3b3b3b3b3b3b3b3b3b3'
  //   },
  // ];

}
