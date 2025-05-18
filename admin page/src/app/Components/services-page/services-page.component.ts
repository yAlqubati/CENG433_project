import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { serviceModel } from '../../models/serviceModel';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ServiceService],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  // Control visibility of service forms
  showUpdateServiceForm = false;
  showAddServiceForm = false;

  // Model for new service data
  newService: serviceModel = {
    _id: '',
    serviceName: '',
    briefDescription: '',
    detailedDescription: '',
    image: undefined,
    lang: '',
    orderOfDisplay: 0
  };

  // Model for service update data
  updateServiceData: serviceModel = {
    _id: '',
    serviceName: '',
    briefDescription: '',
    detailedDescription: '',
    image: undefined,
    lang: '',
    orderOfDisplay: 0
  };

  // Current service data for reference during updates
  currentService: serviceModel = {
    _id: '',
    serviceName: '',
    briefDescription: '',
    detailedDescription: '',
    image: undefined,
    lang: '',
    orderOfDisplay: 0
  };

  // Array to hold the list of services
  services: serviceModel[] = [];

  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch services when the component initializes
    this.getServices();
  }

  /**
   * Handle file input changes for add/update forms
   * @param event - file change event
   * @param status - form status ('add' or 'update')
   */
  onFileChange(event: Event, status: string): void {
    const file = (event.target as HTMLInputElement).files![0]; // Get the uploaded file
    if (status === 'add') {
      this.newService.image = file; // Set file for new service
      console.log('New service image selected:', this.newService.image);
    } else if (status === 'update') {
      this.updateServiceData.image = file; // Set file for service update
      console.log('Update service image selected:', this.updateServiceData.image);
    } else {
      console.error('Error: Invalid file change status');
    }
  }

  /**
   * Construct the full image URL for a given image name
   * @param imagename - name of the image
   * @returns full URL for the image
   */
  getServiceImage(imagename: string): string {
    console.log('Image name:', imagename);
    return `http://localhost:3000/assets/service-images/${imagename}`;
  }

  /**
   * Retrieve the list of services from the server
   */
  getServices(): void {
    this.serviceService.getServices().subscribe((data: serviceModel[]) => {
      this.services = data; // Store fetched services
      console.log('Fetched services:', data);
    });
  }

  /**
   * Add a new service with form data
   * @param newService - service data to be added
   */
  addService(newService: serviceModel): void {
    // Validate required fields
    if (
      !newService.image ||
      !newService.serviceName ||
      !newService.briefDescription ||
      !newService.detailedDescription ||
      !newService.lang
    ) {
      alert('Please fill all the fields'); // Alert if fields are missing
      return;
    }

    this.showAddServiceForm = false; // Hide add form after submission

    // Prepare FormData for service data submission
    const formData = new FormData();
    formData.append('serviceName', newService.serviceName);
    formData.append('briefDescription', newService.briefDescription);
    formData.append('detailedDescription', newService.detailedDescription);
    formData.append('image', newService.image);
    formData.append('lang', newService.lang);
    formData.append('orderOfDisplay', newService.orderOfDisplay.toString());

    // Submit new service data
    this.serviceService.addService(formData).subscribe((data: serviceModel) => {
      this.services.push(data); // Add new service to the array
      console.log('Service added successfully');
      alert('Service Added');
      window.location.reload(); // Reload page to reflect changes
    });
  }

  /**
   * Handle form submission for adding a service
   */
  onSubmitAddService(): void {
    this.addService(this.newService); // Call addService with newService data
  }

  /**
   * Show the add service form and hide the update form
   */
  onClickAddService(): void {
    this.showAddServiceForm = true; // Show add service form
    this.cancelUpdateService(); // Hide update service form
  }

  /**
   * Hide the add service form
   */
  cancelAddService(): void {
    this.showAddServiceForm = false; // Hide add service form
  }

  /**
   * Delete a service by ID
   * @param id - service ID
   */
  deleteService(name: string): void {
    this.serviceService.deleteService(name).subscribe(() => {
      console.log('Service deleted successfully');
      window.location.reload(); // Reload page to reflect changes
    });
  }

  /**
   * Handle the delete action for a service
   * @param serviceID - ID of the service to delete
   */
  onDeleteService(serviceID: string): void {
    this.deleteService(serviceID); // Call deleteService with serviceID
  }

  /**
   * Handle form submission for updating a service
   */
  async onSubmitUpdateService(): Promise<void> {
    // Check if a new image is uploaded; use the existing one if not
    if (!this.updateServiceData.image) {
      if (typeof this.currentService.image === 'string' && this.currentService.image) {
        console.log('No new image uploaded, using existing image from URL');
        this.updateServiceData.image = await this.imageNameToFile(this.currentService.image); // Fetch existing image as File
      } else if (this.currentService.image) {
        console.log('Using existing File image');
        this.updateServiceData.image = this.currentService.image; // Use existing File image directly
      }
    }

    // Proceed to update service data
    this.updateService(this.updateServiceData);
  }

  /**
   * Update an existing service with form data
   * @param updateServiceData - service data to update
   */
  updateService(updateServiceData: serviceModel): void {
    this.showUpdateServiceForm = false; // Hide update form after submission

    // Prepare FormData for service update
    const formData = new FormData();
    formData.append('_id', updateServiceData._id);
    formData.append('serviceName', updateServiceData.serviceName);
    formData.append('briefDescription', updateServiceData.briefDescription);
    formData.append('detailedDescription', updateServiceData.detailedDescription);
    formData.append('image', updateServiceData.image!); // Ensure image is present
    formData.append('lang', updateServiceData.lang);
    formData.append('orderOfDisplay', updateServiceData.orderOfDisplay.toString());

    // Submit updated service data
    this.serviceService.updateService(formData).subscribe(() => {
      console.log('Service updated successfully');
      alert('Service Updated');
      window.location.reload(); // Reload page to show updated service
    });
  }

  /**
   * Load service data into the update form and show it
   * @param service - service data to update
   */
  onEditService(service: serviceModel): void {
    this.updateServiceData = { ...service }; // Copy service data into update model
    this.currentService = service; // Save the current service for reference
    this.showUpdateServiceForm = true; // Show update service form
    this.showAddServiceForm = false; // Hide add service form
  }

  /**
   * Convert image name to File object by fetching it
   * @param imageName - name of the image to fetch
   * @returns Promise resolving to File object
   */
  async imageNameToFile(imageName: string): Promise<File> {
    const imageUrl = 'http://localhost:3000/assets/service-images/' + imageName; // Construct image URL
    const response = await fetch(imageUrl); // Fetch the image
    const blob = await response.blob(); // Convert response to Blob
    const file = new File([blob], imageName, { type: blob.type }); // Create File object
    return file; // Return the File object
  }

  /**
   * Hide the update service form
   */
  cancelUpdateService(): void {
    this.showUpdateServiceForm = false; // Hide update service form
  }

  /**
   * Navigate to specified page
   * @param page - page route
   */
  goto(page: string): void {
    this.router.navigate([`/${page}`]); // Navigate to the specified page
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
