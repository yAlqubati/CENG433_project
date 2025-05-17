import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lang } from '../share/lang';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent 
{
  currentlang:string=''
constructor(private languageservice:lang)
{
  this.currentlang=this.languageservice.getLang()
}

}
