import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Fixed imports
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
logout() {
  
  localStorage.removeItem('token');
  this.router.navigate(['/login']);

}

goto(page: string) {
  this.router.navigate([`/${page}`]);
}
}
