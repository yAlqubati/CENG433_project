import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lang } from '../share/lang';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen = false;
  selectedLanguage: string = 'en';

  constructor(private langService: lang) {
    this.selectedLanguage = this.langService.getLang() || 'en';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  switchLang(): void {
    this.langService.setLang();
    this.selectedLanguage = this.langService.getLang();
    window.location.reload(); // reload to apply language-based routing/data
  }
}
