import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class lang {
  private lang: string;

  constructor() {
    // Retrieve the stored language from localStorage, default to an empty string (English)
    this.lang = localStorage.getItem('lang') || '';
  }

  setLang(): void {
    // Toggle the language between English (empty string) and Arabic ('/ar')
    this.lang = this.lang === '' ? '/ar' : '';
    localStorage.setItem('lang', this.lang); // Store the new language in localStorage
  }

  getLang(): string {
    return this.lang;
  }
}