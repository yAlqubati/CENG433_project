import { inject, Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })

export class lang
{
    private lang: string;
    constructor()
    {
        this.lang = localStorage.getItem('lang') || '';
    }

//for more than 2 languages
    // setLang(lang: string) {
    //     this.lang = lang;
    //     localStorage.setItem('lang', lang);
    // }
//for Ar and En only
    setLang():void
    {
        this.lang = this.lang === '' ? 'ar' : '';
        localStorage.setItem('lang', this.lang);
    }

    getLang(): string {
        return localStorage.getItem('lang') || '';
    }

}



