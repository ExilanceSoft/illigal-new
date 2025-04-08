import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      title: ['', Validators.required],
      wasteType: ['', Validators.required],
      location: ['', Validators.required],
      dateObserved: ['', Validators.required],
      description: [''],
      photos: [null]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.reportForm.patchValue({ photos: input.files });
      this.reportForm.get('photos')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.reportForm.valid) {
      console.log('Form submitted:', this.reportForm.value);
      // Here you would typically send the data to your backend service
      // Example:
      // this.reportService.submitReport(this.reportForm.value).subscribe(...);
      
      // Reset form after submission
      this.reportForm.reset();
      Object.keys(this.reportForm.controls).forEach(key => {
        this.reportForm.get(key)?.setErrors(null);
      });
    }
  }
}