import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lang } from '../../lang';
import { HomepageModel } from '../../../core/models/HomepageModel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  selectedLanguage: string = 'en';
    constructor(private langservice: lang)
  {
    this.selectedLanguage=this.langservice.getLang()
  }
  arData:HomepageModel[]=[
    {

        title: 'تمكين الأفكار، وتحويل التكنولوجيا',
        description: 'من الحلول المعتمدة على الذكاء الاصطناعي إلى تطوير الويب المخصص، نقدم أحدث التقنيات إلى الحياة. دعنا نبني شيئًا رائعًا معًا'
    }
  ]
  enData:HomepageModel[]=[
    {
      title: 'Empowering Ideas, Transforming Technology',
      description: 'From AI-driven solutions to custom web development, we bring cutting-edge technology to life. Let’s build something extraordinary together'
    }
  ]
  get heroContent()
  {
    return this.selectedLanguage==='ar'?this.arData:this.enData 
  }

}
