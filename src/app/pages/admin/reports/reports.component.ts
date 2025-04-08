import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './reports.component.html', // Make sure this matches your actual file name
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  displayedColumns: string[] = ['id', 'type', 'location', 'date', 'status', 'actions'];
  dataSource = [
    { id: '#R-1254', type: 'Hazardous', location: 'Central Park', date: '2023-05-10', status: 'Pending' },
    { id: '#R-1253', type: 'Construction', location: 'Industrial Zone', date: '2023-05-09', status: 'Pending' },
    { id: '#R-1252', type: 'Household', location: 'Residential Area', date: '2023-05-08', status: 'In Progress' },
    { id: '#R-1251', type: 'Electronic', location: 'Downtown', date: '2023-05-07', status: 'Completed' },
    { id: '#R-1250', type: 'Household', location: 'Suburb Area', date: '2023-05-06', status: 'Completed' },
    { id: '#R-1249', type: 'Hazardous', location: 'Industrial Zone', date: '2023-05-05', status: 'Rejected' },
    { id: '#R-1248', type: 'Construction', location: 'Construction Site', date: '2023-05-04', status: 'Completed' }
  ];

  statuses = ['All', 'Pending', 'In Progress', 'Completed', 'Rejected'];
  selectedStatus = 'All';

  get filteredReports() {
    if (this.selectedStatus === 'All') {
      return this.dataSource;
    }
    return this.dataSource.filter(report => report.status === this.selectedStatus);
  }
}