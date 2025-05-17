import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgFor,NgClass,NgIf } from '@angular/common';
import { serviceModel } from '../../core/models/service-card-model';


@Component({
  selector: 'app-service-cards',
  standalone: true,
  imports: [NgFor,NgClass,NgIf],
  templateUrl: './service-cards.component.html',
  styleUrl: './service-cards.component.css'
})
export class ServiceCardsComponent {
  isExpanded: boolean = false;
  isDesktop: boolean = window.innerWidth > 768; // Check if it's desktop

  toggleExpand() {
      if (!this.isDesktop) {
          this.isExpanded = !this.isExpanded;
      }
  }

  @Input() service!: serviceModel;


}
