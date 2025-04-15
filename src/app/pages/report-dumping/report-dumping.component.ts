import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';  
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
interface ReportResponse {
  id: number;
  location: string;
  city: string;
  state: string;
  waste_type: string[];
  size: string;
  date: string;
  time: string;
  description?: string;
  video_link?: string;
  anonymous: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  status: string;
  created_at: string;
}
@Component({
  selector: 'app-report-dumping',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,  
    ReactiveFormsModule,
    MatRadioModule
  ],
  templateUrl: './report-dumping.component.html',
  styleUrls: ['./report-dumping.component.scss']
})
export class ReportDumpingComponent {
  reportForm: FormGroup;
  submitting = false;
  previewUrls: string[] = [];
  selectedFiles: File[] = [];
  
  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  
  wasteTypes = ['Household trash', 'Construction debris', 'Hazardous materials', 'Electronics', 'Tires', 'Appliances', 'Yard waste'];
  sizes = ['Small (trash bag size)', 'Medium (pickup truck load)', 'Large (dumpster size)', 'Very large (multiple dumpsters)'];
  
  safetyTips = [
    { title: 'Keep a safe distance', description: 'Do not approach suspicious individuals or dangerous materials' },
    { title: 'Document from safety', description: 'Take photos from a safe location, preferably from inside your vehicle' },
    { title: 'Note vehicle details', description: 'If safe, record license plates but do not confront drivers' },
    { title: 'Avoid touching waste', description: 'Some materials may be hazardous to your health' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.reportForm = this.fb.group({
      location: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      wasteType: [[], Validators.required],
      size: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: [''],
      videoLink: [''],
      anonymous: [false],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      phone: [''],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }
  
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length) {
      this.selectedFiles = Array.from(files).slice(0, 5) as File[];
      this.previewUrls = [];
      
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.previewUrls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.reportForm.invalid) {
      this.showErrorMessage('Please fill all required fields correctly');
      this.highlightInvalidFields();
      return;
    }
  
    this.submitting = true;
    
    const formData = new FormData();
    
    // Prepare form data
    Object.keys(this.reportForm.value).forEach(key => {
      const value = this.reportForm.value[key];
      
      if (key === 'wasteType') {
        formData.append('waste_type', JSON.stringify(value));
      } else if (key === 'date') {
        const date = new Date(value);
        formData.append('date', date.toISOString().split('T')[0]);
      } else if (key !== 'photos' && key !== 'agreeTerms') {
        // Convert field names to match backend expectations
        const backendKey = this.mapFieldNameToBackend(key);
        formData.append(backendKey, value);
      }
    });
  
    // Add files
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        formData.append('files', file, file.name);
      });
    }
  
    // Make API call with improved messaging
    this.http.post<ReportResponse>('http://127.0.0.1:8000/reports/', formData)
      .subscribe({
        next: (response) => {
          this.showSuccessMessage(response);
          this.navigateToConfirmation(response.id);
        },
        error: (error) => {
          this.handleSubmissionError(error);
        }
      });
  }
  
  private mapFieldNameToBackend(frontendName: string): string {
    // Map frontend field names to backend expected names
    const fieldMap: {[key: string]: string} = {
      'firstName': 'first_name',
      'lastName': 'last_name',
      'videoLink': 'video_link'
    };
    return fieldMap[frontendName] || frontendName;
  }
  
  private showSuccessMessage(response: ReportResponse): void {
    this.submitting = false;
    
    const message = `Report #${response.id} submitted successfully!`;
    const action = 'View Details';
    
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 10000,  // 10 seconds
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'
    });
  
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/reports', response.id]);
    });
  }
  
  private navigateToConfirmation(reportId: number): void {
    setTimeout(() => {
      this.router.navigate(['/confirmation'], {
        state: { 
          reportId: reportId,
          message: 'Thank you for your report! Authorities will review it shortly.'
        }
      });
    }, 1500); // Small delay to let user see success message
  }
  
  private handleSubmissionError(error: any): void {
    this.submitting = false;
    
    let errorMessage = 'Failed to submit report';
    let duration = 5000;
    let panelClass = ['error-snackbar'];
  
    if (error.status === 0) {
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid data: ' + (error.error?.detail || 'Please check your inputs');
    } else if (error.status === 413) {
      errorMessage = 'File size too large. Please upload files under 5MB each.';
      duration = 8000;
    } else if (error.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
  
    this.snackBar.open(errorMessage, 'Close', {
      duration,
      panelClass,
      verticalPosition: 'top'
    });
  }
  
  private highlightInvalidFields(): void {
    // Mark all fields as touched to show errors
    Object.keys(this.reportForm.controls).forEach(field => {
      const control = this.reportForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  
    // Scroll to first invalid field
    const firstInvalidElement = document.querySelector('.ng-invalid');
    if (firstInvalidElement) {
      firstInvalidElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }
  
  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top'
    });
  }
  cancelReport(): void {
    if (this.reportForm.dirty) {
      if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}