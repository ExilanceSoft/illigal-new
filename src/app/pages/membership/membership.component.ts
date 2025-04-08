import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss'
})
export class MembershipComponent implements OnInit {
  membershipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.membershipForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      street: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      membershipLevel: ['basic', Validators.required],
      volunteerInterest: [false],
      newsletterConsent: [true],
      termsAgreement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  submitMembership(): void {
    if (this.membershipForm.valid) {
      // In a real app, you would send this data to your backend
      console.log('Membership form submitted:', this.membershipForm.value);
      
      // Show success message and redirect
      alert('Thank you for becoming a member! You will receive a confirmation email shortly.');
      this.router.navigate(['/']);
    }
  }
}