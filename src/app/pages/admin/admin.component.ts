import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Add this import

@Component({
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule // Add this to imports array
  ]
})
export class AdminComponent {
  displayedColumns = ['id', 'location', 'status', 'actions'];
  dataSource = [
    { id: 'R-1001', location: 'Central Park', status: 'Pending' },
    { id: 'R-1002', location: 'Riverside', status: 'Processed' }
  ];
}