import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatDialogModule, // Add this import
    
  ],
  template: `
    <div class="event-dialog">
      <h2 mat-dialog-title>{{data.title}}</h2>
      <mat-divider></mat-divider>
      <mat-dialog-content>
        <div class="event-dialog-image">
          <img [src]="data.image" [alt]="data.title" class="img-fluid">
        </div>
        
        <div class="event-details">
          <div class="detail-row">
            <mat-icon>event</mat-icon>
            <span>{{data.date | date:'fullDate'}}</span>
          </div>
          <div class="detail-row">
            <mat-icon>schedule</mat-icon>
            <span>{{data.time}}</span>
          </div>
          <div class="detail-row">
            <mat-icon>location_on</mat-icon>
            <span>{{data.location}}</span>
          </div>
          <div class="detail-row">
            <mat-icon>people</mat-icon>
            <span>{{data.participants}} people attending</span>
          </div>
          <div class="detail-row">
            <mat-icon>person</mat-icon>
            <span>Organized by: {{data.organizer}}</span>
          </div>
          
          <mat-divider></mat-divider>
          
          <h3>About This Event</h3>
          <p>{{data.description}}</p>
          
          <div *ngIf="data.requirements" class="requirements">
            <h3>Requirements</h3>
            <p>{{data.requirements}}</p>
          </div>
          
          <div class="contact">
            <h3>Contact</h3>
            <p>{{data.contact}}</p>
          </div>
        </div>
      </mat-dialog-content>
      <mat-divider></mat-divider>
      <mat-dialog-actions align="end">
        <button mat-stroked-button mat-dialog-close>Close</button>
        <button mat-raised-button color="primary" (click)="onJoinClick()">
          <mat-icon>how_to_reg</mat-icon>
          Join Event
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .event-dialog {
      max-width: 100%;
      width: 600px;
    }
    
    .event-dialog-image {
      margin-bottom: 1.5rem;
      
      img {
        width: 100%;
        max-height: 250px;
        object-fit: cover;
        border-radius: 8px;
      }
    }
    
    .event-details {
      .detail-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 0.75rem;
        
        mat-icon {
          color: #2e7d32;
        }
      }
      
      h3 {
        margin: 1.5rem 0 0.75rem;
        color: #2e7d32;
      }
      
      .requirements {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
      }
      
      .contact {
        margin-top: 1.5rem;
      }
    }
    
    mat-dialog-actions {
      padding: 1rem 1.5rem;
    }
  `]
})
export class EventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onJoinClick(): void {
    // This would connect to a service in a real app
    alert(`You've successfully joined ${this.data.title}! Details will be emailed to you.`);
    this.dialogRef.close(true);
  }
}