import { Component, Injectable, OnInit } from '@angular/core';
import { ServiceCardsComponent } from '../../share/service-cards/service-cards.component';
import { NgFor } from '@angular/common';
import { environment } from '../../core/env/Environment.API';
import { HttpClient } from '@angular/common/http';
import { serviceModel } from '../../core/models/service-card-model';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { EclipsePurpleComponent } from '../../share/eclipse-purple/eclipse-purple.component';
import { EclipseBlueComponent } from '../../share/eclipse-blue/eclipse-blue.component';
import { lang } from '../../share/lang';
import { ShareDataModel } from '../../core/models/ShareDataModel';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceCardsComponent, NgFor,HttpClientModule,EclipseBlueComponent,EclipsePurpleComponent ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'], // Fixed typo from styleUrl to styleUrls
})
@Injectable({
  providedIn: 'root',
})
export class ServicesComponent implements OnInit {
  serviceCards: serviceModel[] = [];
  // selectedLanguage: string = '';
  currentLang:string=''


  constructor(private http: HttpClient,private langService: lang) {}
  get ApiUrl() {
     this.currentLang = this.langService.getLang();
     if(this.currentLang === 'ar')
    {
      return `${environment.API}/Services/${this.currentLang}`;
    }
    return `${environment.API}/Services`;


    
  }

  get getServices(): Observable<serviceModel[]> {
    return this.http.get<serviceModel[]>(this.ApiUrl);
  }

  ngOnInit() {
    this.getServices.subscribe({
      next: (data) => {
        // console.log('Data received:', data);
        this.serviceCards = data;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      },
    });
  }


  enData: ShareDataModel[] = [
    {
      label: 'Our Services', // English Label
      title: 'Empowering Your Online Presence',
      description: `We build websites that go beyond aesthetics—our solutions are designed for performance, security, and scalability. 
                    Whether you need a corporate website, e-commerce platform, or custom web application, we deliver digital excellence tailored to your business goals.`
    }
  ];

  // Arabic Data
  arData: ShareDataModel[] = [
    {
      label: 'خدماتنا',  // Arabic Label
      title: 'تمكين وجودك على الإنترنت',
      description: `نحن نبني مواقع إلكترونية تتجاوز الجماليات — حلولنا مصممة للأداء والأمان والقابلية للتوسع. 
                    سواء كنت بحاجة إلى موقع شركتك الإلكتروني أو منصة تجارة إلكترونية أو تطبيق ويب مخصص، نقدم لك تميزًا رقميًا مخصصًا يلبي أهداف عملك.`
    }
  ];

  // Getter to return the correct language data
  get content() {
    return this.currentLang === 'ar' ? this.arData : this.enData;
  }

  // serviceCards = [
  //   {
  //     serviceName: 'Web Development',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'Mobile Development',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'UI/UX Design',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'SEO',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'Digital Marketing',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'Content Writing',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'E-commerce Development',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

  //   {
  //     serviceName: 'Web Development',
  //     image:'',
  //     briefDescription: 'built-in analytics to track your nfts',
  //     detailedDescription: 'Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. '
  //   },

   

    
   
  // ];


}
