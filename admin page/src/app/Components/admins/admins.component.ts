import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../Services/admin.service';
import { adminModel } from '../../models/adminModel';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Fixed imports
  providers: [AdminService],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'] // Fixed styleUrl to styleUrls
})
export class AdminsComponent {
  showAddAdmin = false;       // Controls visibility of the add admin form
  showUpdateAdmin = false;    // Controls visibility of the update admin form
  showAllPasswords = false;   // Controls visibility of all passwords
  newAdmin: adminModel = { username: '', password: '' }; // Model for new admin
  selectedAdmin: adminModel | null = null; // Holds the admin to be updated
  updateAdmin: adminModel = { username: '', password: '' }; // Model for updating admin

  constructor(
    private adminService: AdminService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdmins(); // Fetches the list of admins on component initialization
  }

  admins: adminModel[] = []; // Holds the list of admins

  getAdmins() {
    // Fetch admins from the service
    this.adminService.getAdmins().subscribe((data: adminModel[]) => {
      this.admins = data; // Update the admins list
    });
  }

  onSubmitAdd() {
    // Add the new admin using the service
    const formData = new FormData();
    formData.append('username', this.newAdmin.username);
    formData.append('password', this.newAdmin.password);
    this.adminService.addAdmin(formData).subscribe((data: adminModel) => {
      this.newAdmin = { username: '', password: '' }; // Reset the form
      this.showAddAdmin = false; // Hide the add form
      this.getAdmins(); // Fetch the updated list of admins
    });
  }

  onDeleteAdmin(username: string) {
    // Delete the admin by username using the service
    this.adminService.deleteAdmin(username).subscribe(() => {
      this.admins = this.admins.filter((admin) => admin.username !== username); // Remove the deleted admin
    });
  }

  onAddAdmin() {
    this.showAddAdmin = true; // Show the add admin form
  }

  onEditAdmin(admin: adminModel) {
    this.selectedAdmin = admin; // Set the admin to be updated
    this.updateAdmin = { username: admin.username, password: '' }; // Prepare the update form
    this.showUpdateAdmin = true; // Show the update form
  }

  onSubmitUpdate() {
    // Update the admin's password using the service
    if (this.selectedAdmin) {
      const formData = new FormData();
      formData.append('username', this.selectedAdmin.username);
      formData.append('password', this.updateAdmin.password);
      this.adminService.updateAdminPassword(formData).subscribe(() => {
        this.showUpdateAdmin = false; // Hide the update form
        this.selectedAdmin = null; // Clear the selected admin
      });
    }
  }

  cancelUpdate() {
    this.showUpdateAdmin = false; // Hide the update form
    this.selectedAdmin = null; // Clear the selected admin
  }

  toggleAllPasswords() {
    this.showAllPasswords = !this.showAllPasswords; // Toggle password visibility
  }

  logOut() {
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/login']); // Navigate to the login page
  }
  goto(page: string) {
    this.router.navigate([`/${page}`]); // Navigate to the specified page
  }
}
