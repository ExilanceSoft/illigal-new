import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { title: 'Total Reports', value: 1240, icon: 'report', color: 'primary' },
    { title: 'Pending Review', value: 42, icon: 'schedule', color: 'accent' },
    { title: 'Cleanup Events', value: 85, icon: 'event', color: 'warn' },
    { title: 'Active Volunteers', value: 326, icon: 'people', color: 'primary' }
  ];

  recentReports = [
    { id: '#R-1254', type: 'Hazardous', location: 'Central Park', date: '2 hours ago', status: 'Pending' },
    { id: '#R-1253', type: 'Construction', location: 'Industrial Zone', date: '5 hours ago', status: 'Pending' },
    { id: '#R-1252', type: 'Household', location: 'Residential Area', date: '1 day ago', status: 'In Progress' },
    { id: '#R-1251', type: 'Electronic', location: 'Downtown', date: '2 days ago', status: 'Completed' }
  ];

  upcomingEvents = [
    { title: 'Community Cleanup', date: 'May 15, 2023', location: 'Riverside Park', volunteers: 24 },
    { title: 'E-Waste Collection', date: 'May 22, 2023', location: 'City Center', volunteers: 18 },
    { title: 'Hazardous Waste Disposal', date: 'June 5, 2023', location: 'Industrial Area', volunteers: 12 }
  ];
}