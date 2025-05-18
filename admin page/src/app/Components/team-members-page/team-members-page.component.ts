import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { teamMemberModel } from '../../models/teamMemberModel';
import { TeamMemberService } from '../../Services/team-member.service';

@Component({
  selector: 'app-team-members-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TeamMemberService],
  templateUrl: './team-members-page.component.html',
  styleUrls: ['./team-members-page.component.scss']
})
export class TeamMembersPageComponent implements OnInit {
  // Control visibility of forms
  showUpdateMemberForm = false;
  showAddMemberForm = false;

  // Models for adding and updating team members
  newMember: teamMemberModel = {
    name: '',
    position: '',
    image: undefined,
    linkedIn: '',
    github: '',
    orderOfDisplay: 0,
    _id: ''
  };

  updateMemberData: teamMemberModel = { ...this.newMember };
  currentMember: teamMemberModel = { ...this.newMember };
  
  // Array to store team members data
  teamMembers: teamMemberModel[] = [];

  constructor(
    private teamMemberService: TeamMemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeamMembers(); // Load team members on initialization
  }

  /**
   * Handle file input changes for both add and update forms.
   * @param event - File input change event.
   * @param status - Status indicating 'add' or 'update'.
   */
  onFileChange(event: Event, status: string): void {
    const file = (event.target as HTMLInputElement).files![0]; // Get uploaded file
    if (status === 'add') {
      this.newMember.image = file; // Set file for new member
    } else if (status === 'update') {
      this.updateMemberData.image = file; // Set file for updating member
    } else {
      alert('Error: Invalid status for file change.');
    }
  }

  /**
   * Fetch team members from the service.
   */
  getTeamMembers(): void {
    this.teamMemberService.getTeamMembers().subscribe((data: teamMemberModel[]) => {
      this.teamMembers = data; // Store fetched team members
    });
    for (let i = 0; i < this.teamMembers.length; i++) {
     // this.teamMembers[i].orderOfDisplay = i;
    console.log(this.teamMembers[i].linkedIn);
    }
  }

  /**
   * Add a new team member.
   * @param newMember - The new team member to be added.
   */
  addTeamMember(newMember: teamMemberModel): void {
    // Validate required fields
    if (!newMember.image || !newMember.name || !newMember.position) {
      alert('Please fill all the fields');
      return;
    }

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append('name', newMember.name);
    formData.append('position', newMember.position);
    formData.append('image', newMember.image);
    formData.append('linkedIn', newMember.linkedIn);
    formData.append('github', newMember.github);
    formData.append('orderOfDisplay', newMember.orderOfDisplay.toString());

    console.log('Form Data:', formData.get('linkedIn'));
    // Call service to add the new team member and update the view
    this.teamMemberService.addTeamMember(formData).subscribe((data: teamMemberModel) => {
      this.teamMembers.push(data); // Add the new member to the array
      alert('Team Member Added Successfully');
      window.location.reload(); // Refresh to show the updated list
    });
    
    this.showAddMemberForm = false; // Hide the add member form after submission
  }

  /**
   * Delete a team member by ID.
   * @param id - The ID of the member to delete.
   */
  deleteTeamMember(name: string): void {
    this.teamMemberService.deleteTeamMember(name).subscribe(() => {
      window.location.reload(); // Refresh to show updated list
    });
  }

  /**
   * Update an existing team member's data.
   * @param updateMemberData - The data for updating the team member.
   */
  async updateTeamMember(updateMemberData: teamMemberModel): Promise<void> {
    // Validate required fields
    if (!updateMemberData.name || !updateMemberData.position) {
      alert('Please fill all the fields');
      return;
    }

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append('name', updateMemberData.name);
    formData.append('position', updateMemberData.position);
    
    // Include new image if present
    if (updateMemberData.image) {
      formData.append('image', updateMemberData.image);
    }
    
    formData.append('linkedIn', updateMemberData.linkedIn);
    formData.append('github', updateMemberData.github);
    formData.append('orderOfDisplay', updateMemberData.orderOfDisplay.toString());
    formData.append('_id', updateMemberData._id);

    console.log('Form Data:', formData.get('image'));
    console.log('Form Data:', formData.get('linkedIn'));

    // Call service to update team member and alert the user
    this.teamMemberService.updateTeamMember(formData).subscribe(() => {
      alert('Team Member Updated Successfully');
      window.location.reload(); // Refresh to show updated list
    });

    this.showUpdateMemberForm = false; // Hide the update form after submission
  }

  /**
   * Submit handler for adding a new member.
   */
  onSubmitAddMember(): void {
    this.addTeamMember(this.newMember); // Call addTeamMember with newMember data
  }

  /**
   * Show the add member form.
   */
  onClickAddMember(): void {
    this.showAddMemberForm = true; // Show add member form
    this.showUpdateMemberForm = false; // Hide update form
  }

  /**
   * Hide the add member form without saving.
   */
  cancelAddMember(): void {
    this.showAddMemberForm = false; // Hide add member form
  }

  /**
   * Submit handler for updating a member.
   */
  async onSubmitUpdateMember(): Promise<void> {
    // Check if no new image is uploaded
    if (!this.updateMemberData.image) {
      // If currentMember.image is a string, fetch it as a file
      if (typeof this.currentMember.image === 'string' && this.currentMember.image) {
        console.log('No new image uploaded, using existing image from URL');
        this.updateMemberData.image = await this.imageNameToFile(this.currentMember.image);
      } else if (this.currentMember.image instanceof File) {
        // If currentMember.image is already a File
        console.log('Using existing File image');
        this.updateMemberData.image = this.currentMember.image; // Use existing image
      } else {
        console.log('No existing image found for this member');
        this.updateMemberData.image = undefined; // Handle case where there is no image
      }
    }
    
    this.updateTeamMember(this.updateMemberData); // Call updateTeamMember with updated data
  }

  /**
   * Show update form for a selected member.
   * @param member - The member data to update.
   */
  onEditMember(member: teamMemberModel): void {
    this.showUpdateMemberForm = true; // Show update form
    this.showAddMemberForm = false; // Hide add member form
    this.updateMemberData = { ...member }; // Copy member data into update model
    this.updateMemberData.image = undefined; // Reset image for update
    this.currentMember = member; // Keep reference to current member
  }

  /**
   * Hide the update form without saving.
   */
  cancelUpdateMember(): void {
    this.showUpdateMemberForm = false; // Hide update form
  }

  /**
   * Navigate to a specified page.
   * @param page - The route of the page to navigate to.
   */
  goto(page: string): void {
    this.router.navigate([`/${page}`]); // Navigate to specified page
  }

  /**
   * Construct the full URL for a team member's image.
   * @param image - The image name.
   * @returns Full URL for the image.
   */
  getTeamMemberImage(image: string): string {
    return `http://localhost:3000/assets/service-images/${image}`; // Construct image URL
  }

  /**
   * Convert image name to File object by fetching it.
   * @param imageName - The name of the image to fetch.
   * @returns A promise that resolves to the File object.
   */
  async imageNameToFile(imageName: string): Promise<File> {
    const imageUrl = 'http://localhost:3000/assets/team-images/' + imageName; // Construct image URL
    const response = await fetch(imageUrl); // Fetch the image
    const blob = await response.blob(); // Convert response to Blob
    const file = new File([blob], imageName, { type: blob.type }); // Create File object
    return file; // Return the File object
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
