import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lang } from '../../lang';
import { RouterModule, Router } from '@angular/router';
import { projectModel } from '../../models/projectModel';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ProjectService],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  // Control visibility of add/update project forms
  showUpdateProjectForm: boolean = false;
  showAddProjectForm: boolean = false;

  // Model objects for new and updated project data
  newProject: projectModel = {
    _id: '',
    projectName: '',
    briefDescription: '',
    detailedDescription: '',
    image: undefined,
    lang: '',
    orderOfDisplay: 0
  };
  updateProjectData: projectModel = {
    _id: '',
    projectName: '',
    briefDescription: '',
    detailedDescription: '',
    image: undefined,
    lang: '',
    orderOfDisplay: 0
  };

  // Store current project to retrieve existing image
  currentProject: projectModel = {
    _id: '',
    projectName: '',
    briefDescription: '',
    detailedDescription: '',
    image: undefined,
    lang: '',
    orderOfDisplay: 0
  };

  // Array to hold project data
  projects: projectModel[] = [];

  constructor(
    private projectService: ProjectService,
    private lang: lang,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch projects when component initializes
    this.getProjects();
  }

  /**
   * Retrieve the list of projects from the server
   */
  getProjects(): void {
    this.projectService.getProjects().subscribe((data: projectModel[]) => {
      this.projects = data; // Store fetched projects
    });
  }

  /**
   * Toggle language settings and refresh the page
   */
  changeLang(): void {
    this.lang.setLang(); // Set new language
    window.location.reload(); // Reload to apply language change
  }

  /**
   * Handle file input changes for add/update forms
   * @param $event - file change event
   * @param status - form status ('add' or 'update')
   */
  onFileChange($event: Event, status: string): void {
    const input = $event.target as HTMLInputElement;
    const file = input?.files ? input.files[0] : null; // Get the uploaded file
    if (file) {
      // Set the file to the appropriate project model based on status
      status === 'add' ? (this.newProject.image = file) : (this.updateProjectData.image = file);
    } else {
      console.error('Invalid file input'); // Log error if file input is invalid
    }
  }

  /**
   * Add a new project with form data
   */
  addProject(newProject: projectModel): void {
    // Ensure all required fields are provided
    if (!newProject.image || !newProject.projectName || !newProject.briefDescription || !newProject.detailedDescription) {
      console.error('Please fill all the fields'); // Log error if fields are missing
      return;
    }

    // Construct FormData for project data submission
    const formData = new FormData();
    formData.append('projectName', newProject.projectName);
    formData.append('briefDescription', newProject.briefDescription);
    formData.append('detailedDescription', newProject.detailedDescription);
    formData.append('image', newProject.image);
    formData.append('lang', newProject.lang);
    formData.append('orderOfDisplay', newProject.orderOfDisplay.toString());

    // Submit new project data
    this.projectService.addProject(formData).subscribe((data: projectModel) => {
      this.projects.push(data); // Add new project to the array
      window.location.reload(); // Reload page to show new project
    });
  }

  /**
   * Handle form submission for adding a project
   */
  onSubmitAdd(): void {
    this.addProject(this.newProject); // Call addProject with newProject data
  }

  /**
   * Show add project form and reset update form visibility
   */
  onClickAddProject(): void {
    this.showAddProjectForm = true; // Show add project form
    this.showUpdateProjectForm = false; // Hide update project form
  }

  /**
   * Hide add project form
   */
  cancelAdd(): void {
    this.showAddProjectForm = false; // Hide add project form
  }

  /**
   * Delete a project by ID
   * @param id - project ID
   */
  deleteProject(projectName: string): void {
    this.projectService.deleteProject(projectName).subscribe(() => {
      window.location.reload(); // Reload page to reflect changes
    });
  }

  /**
   * Update an existing project with form data
   */
  async updateProject(updateProject: projectModel): Promise<void> {
    // Ensure all required fields are provided
    if (!updateProject.projectName || !updateProject.briefDescription || !updateProject.detailedDescription) {
      console.error('Please fill all the fields'); // Log error if fields are missing
      return;
    }

    // Construct FormData for project update
    const formData = new FormData();
    formData.append('projectName', updateProject.projectName);
    formData.append('briefDescription', updateProject.briefDescription);
    formData.append('detailedDescription', updateProject.detailedDescription);
    
    // Check if a new image is uploaded
    if (updateProject.image) {
      // If a new image is uploaded, append it to formData
      formData.append('image', updateProject.image);
    } else {
      // Use the existing image if no new image is uploaded
      if (this.currentProject.image) {
        if (typeof this.currentProject.image === 'string') {
          // If the existing image is a URL, fetch it as a file
          console.log('No new image uploaded, using existing image from URL');
          const existingImageFile = await this.imageNameToFile(this.currentProject.image);
          formData.append('image', existingImageFile); // Append existing image file
        } else if (this.currentProject.image instanceof File) {
          // If currentProject.image is already a File, use it directly
          console.log('Using existing File image');
          formData.append('image', this.currentProject.image);
        }
      } else {
        console.log('No existing image found for this project'); // Log if no existing image
      }
    }

    formData.append('lang', updateProject.lang);
    formData.append('orderOfDisplay', updateProject.orderOfDisplay.toString());
    formData.append('_id', updateProject._id);

    // Submit updated project data
    this.projectService.updateProject(formData).subscribe(() => {
      window.location.reload(); // Reload page to show updated project
    });
  }

  /**
   * Handle form submission for updating a project
   */
  onSubmitUpdate(): void {
    this.updateProject(this.updateProjectData); // Call updateProject with updateProjectData
  }

  /**
   * Load project data into update form and show it
   * @param updateProject - project data to update
   */
  onEditProject(updateProject: projectModel): void {
    this.showUpdateProjectForm = true; // Show update project form
    this.showAddProjectForm = false; // Hide add project form
    this.updateProjectData = { ...updateProject }; // Copy project data into update model
    this.updateProjectData.image = undefined; // Reset image for the update
    this.currentProject = updateProject; // Save the current project for reference
  }

  /**
   * Hide update project form
   */
  cancelUpdate(): void {
    this.showUpdateProjectForm = false; // Hide update project form
  }

  /**
   * Navigate to specified page
   * @param page - page route
   */
  goto(page: string): void {
    this.router.navigate([`/${page}`]); // Navigate to the specified page
  }

  /**
   * Construct the full image URL for a given image name
   * @param imageName - name of the image
   * @returns full URL for the image
   */
  getProjectImage(imageName: string): string {
    return `http://localhost:3000/assets/project-images/${imageName}`;
  } 

  /**
   * Convert image name to File object by fetching it
   * @param imageName - name of the image to fetch
   * @returns Promise resolving to File object
   */
  async imageNameToFile(imageName: string): Promise<File> {
    const imageUrl = 'http://localhost:3000/assets/project-images/' + imageName; // Construct image URL
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
