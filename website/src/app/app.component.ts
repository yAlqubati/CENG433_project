import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { EclipsePurpleComponent } from './share/eclipse-purple/eclipse-purple.component';
import { EclipseBlueComponent } from './share/eclipse-blue/eclipse-blue.component'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, HeaderComponent, FooterComponent,RouterLink,EclipsePurpleComponent,EclipseBlueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
 


  
})
export class AppComponent {
  // title = 'basita';
}
