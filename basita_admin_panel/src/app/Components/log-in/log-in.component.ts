import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { adminModel } from '../../models/adminModel';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RouterLink, CommonModule],
  providers: [AdminService],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  admin: adminModel = {
    username: '',
    password: '',
  };

  loginError = false;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }
  
  onSubmit() {
    // Reset the error flag
    this.loginError = false;

    // Call the authAdmin method from AdminService to authenticate the admin
    this.adminService.authAdmin(this.admin).subscribe({
      next: (response) => {
        // Store the token in localStorage
        localStorage.setItem('token', response.token);
        
        // Navigate to the admin dashboard after login success
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Handle any errors (e.g., invalid credentials, server issues)
        this.loginError = true;
        console.error('Login error: ', err);
      }
    });
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
