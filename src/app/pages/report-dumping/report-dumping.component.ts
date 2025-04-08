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
import {MatRadioModule} from '@angular/material/radio';

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
    MatRadioModule  ],
  templateUrl: './report-dumping.component.html',
  styleUrls: ['./report-dumping.component.scss']
})
export class ReportDumpingComponent {
  reportForm: FormGroup;
  submitting = false;
  previewUrls: string[] = [];
  
  states = ['Alabama', 'Alaska', 'Arizona', /* ... */];
  wasteTypes = ['Household trash', 'Construction debris', 'Hazardous materials', 'Electronics', 'Tires', 'Appliances', 'Yard waste'];
  sizes = ['Small (trash bag size)', 'Medium (pickup truck load)', 'Large (dumpster size)', 'Very large (multiple dumpsters)'];
  
  safetyTips = [
    { title: 'Keep a safe distance', description: 'Do not approach suspicious individuals or dangerous materials' },
    { title: 'Document from safety', description: 'Take photos from a safe location, preferably from inside your vehicle' },
    { title: 'Note vehicle details', description: 'If safe, record license plates but do not confront drivers' },
    { title: 'Avoid touching waste', description: 'Some materials may be hazardous to your health' }
  ];

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      location: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      wasteType: [[], Validators.required],
      size: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: [''],
      photos: [[]],
      videoLink: [''],
      anonymous: [false],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      phone: [''],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }
  nextStep(){

  }
  cancelReport(){
    
  }
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(index: number): void {
    this.previewUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.submitting = true;
      setTimeout(() => {
        console.log('Form submitted', this.reportForm.value);
        this.submitting = false;
      }, 2000);
    }
  }
}
