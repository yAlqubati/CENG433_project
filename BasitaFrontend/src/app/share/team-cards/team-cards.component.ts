import { NgFor } from '@angular/common';
import { Component,  Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamModel } from '../../core/models/team-model';
//  import { TeamCardsComponent } from '../../images/nerdLan.jpg';


@Component({
  selector: 'app-team-cards',
  standalone: true,
  imports: [NgFor],
  templateUrl: './team-cards.component.html',
  styleUrl: './team-cards.component.css'
})
export class TeamCardsComponent {
  @Input() member!: TeamModel;

  
  //   {
  //     name: 'Karim',
  //     position: 'CEO of Uncle Yahya and Nerd',
  //     image: 'assets/img/Karim.png',
  //     description: 'عم يحيى و النيرد',
  //     Github: 'https://github.com/karim-mansoor',
  //     Linkedin: '',
      
  //   },
  //   {
  //     name: 'Its The Nerd',
  //     position: 'CEO of nothingness',
  //     image: 'assets/img/nerdLan.png', 
  //     description: 'useless Coomer + leader of a Big simp army',
  //     Github: 'https://github.com/yAlqubati',
  //     Linkedin: '',
  //   },
  //   {
  //     name: 'Yahya',
  //     position: 'CEO of simpeness',
  //     image: 'assets/img/yahya.png',
  //     description: 'useless Coomer + leader of a Big simp army',
  //     Github: 'https://github.com/yhyimm',
  //     Linkedin: '',
  //   }
  // ];

  



}
