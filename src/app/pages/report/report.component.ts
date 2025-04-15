import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  reportForm: FormGroup;
  wasteTypes = ['Household', 'Construction', 'Electronic', 'Hazardous', 'Other'];
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.reportForm = this.fb.group({
      location: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      wasteType: ['', Validators.required],
      size: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: [''],
      videoLink: [''],
      anonymous: [false],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onSubmit() {
    if (this.reportForm.valid) {
      const formData = new FormData();
      
      // Add all form values to FormData
      Object.keys(this.reportForm.value).forEach(key => {
        formData.append(key, this.reportForm.value[key]);
      });

      // Convert wasteType to JSON array format
      formData.set('wasteType', JSON.stringify([this.reportForm.value.wasteType]));

      // Add files if any
      this.selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      // Send to backend
      this.http.post('http://127.0.0.1:8000/reports/', formData)
        .subscribe({
          next: (response) => {
            this.snackBar.open('Report submitted successfully!', 'Close', {
              duration: 3000
            });
            this.resetForm();
          },
          error: (error) => {
            console.error('Error submitting report:', error);
            this.snackBar.open('Error submitting report. Please try again.', 'Close', {
              duration: 3000
            });
          }
        });
    }
  }

  resetForm() {
    this.reportForm.reset();
    this.selectedFiles = [];
    Object.keys(this.reportForm.controls).forEach(key => {
      this.reportForm.get(key)?.setErrors(null);
    });
  }
}