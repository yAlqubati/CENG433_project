import { NgModule } from '@angular/core';
import { Routes,RouterModule,RouterLink,RouterLinkActive } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { OurProjectComponent } from './components/our-project/our-project.component';
import { Injectable } from '@angular/core';






export const routes: Routes = [
    { 
    path: '', component: HomepageComponent
    }
    ,
    { path: 'services', component: ServicesComponent },
    { path: 'team', component: TeamComponent }
    ,
    {path: 'contact-us', component: ContactUsComponent}
    ,
    {path: 'our-project', component: OurProjectComponent

    },
    // add arabic language route
    {
     path:'Ar',
     children:[
      {
        path: '', component: HomepageComponent
      }, 
      {
        path: 'services', component: ServicesComponent
      
      },
      {
        path: 'team', component: TeamComponent
      },
      {
        path: 'contact-us', component: ContactUsComponent
      },
      {
        path: 'our-project', component: OurProjectComponent
      }
      
     ]
    
    }



   
];

@NgModule({
    declarations: [

 
    
      ],
    imports: [RouterModule.forRoot(routes),RouterLink,RouterLinkActive],
    exports: [RouterModule],
   
  })
  @Injectable({
    providedIn: 'root', // Makes it available globally
  })
  export class AppRoutingModule {
    constructor() {
    }

    getRoutes() {

      return routes;
    }
   }