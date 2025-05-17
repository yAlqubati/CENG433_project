import { Component,Input } from '@angular/core';
import { NgFor,NgIf,CommonModule } from '@angular/common';
import { projectDetailsModel } from '../../core/models/project-card-model';


@Component({
  selector: 'app-our-project-card',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule],
  templateUrl: './our-project-card.component.html',
  styleUrl: './our-project-card.component.css'
})
export class OurProjectCardComponent {
   
  @Input() projects: projectDetailsModel[] = [];
    

}
