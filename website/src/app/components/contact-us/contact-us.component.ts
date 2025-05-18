import { Component } from '@angular/core';
import {TeamCardsComponent} from '../../share/team-cards/team-cards.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [TeamCardsComponent, NgFor],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  

}
