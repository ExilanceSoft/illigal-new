import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  // Dashboard statistics
  stats: any[] = [];
  
  // Recent reports data
  recentReports: any[] = [];
  displayedColumns: string[] = ['id', 'type', 'location', 'date', 'status', 'actions'];
  
  // Upcoming events data
  upcomingEvents: any[] = [];
  
  // Loading states
  isLoadingStats = true;
  isLoadingReports = true;
  isLoadingEvents = true;
  
  // Error states
  errorStats = false;
  errorReports = false;
  errorEvents = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loadStatistics();
    this.loadRecentReports();
    this.loadUpcomingEvents();
  }

  loadStatistics(): void {
    this.isLoadingStats = true;
    this.errorStats = false;
    
    // In a real app, you would call your backend API
    // For now, we'll simulate API calls with mock data
    setTimeout(() => {
      this.http.get<any>('http://localhost:8000/reports', {
        params: {
          page: '1',
          limit: '1000' // Get all for stats calculation
        }
      }).subscribe({
        next: (reportResponse) => {
          const allReports = reportResponse.data;
          
          this.http.get<any>('http://localhost:8000/events').subscribe({
            next: (events) => {
              this.http.get<any>('http://localhost:8000/members').subscribe({
                next: (members) => {
                  // Calculate statistics
                  this.stats = [
                    { 
                      title: 'Total Reports', 
                      value: allReports.length, 
                      icon: 'report', 
                      color: 'primary' 
                    },
                    { 
                      title: 'Pending Review', 
                      value: allReports.filter((r: any) => r.status === 'pending').length, 
                      icon: 'schedule', 
                      color: 'accent' 
                    },
                    { 
                      title: 'Cleanup Events', 
                      value: events.length, 
                      icon: 'event', 
                      color: 'warn' 
                    },
                    { 
                      title: 'Active Volunteers', 
                      value: members.filter((m: any) => m.volunteer_interest).length, 
                      icon: 'people', 
                      color: 'primary' 
                    }
                  ];
                  this.isLoadingStats = false;
                },
                error: () => {
                  this.errorStats = true;
                  this.isLoadingStats = false;
                }
              });
            },
            error: () => {
              this.errorStats = true;
              this.isLoadingStats = false;
            }
          });
        },
        error: () => {
          this.errorStats = true;
          this.isLoadingStats = false;
        }
      });
    }, 500); // Simulate network delay
  }

  loadRecentReports(): void {
    this.isLoadingReports = true;
    this.errorReports = false;
    
    // Simulate API call
    setTimeout(() => {
      this.http.get<any>('http://localhost:8000/reports', {
        params: {
          page: '1',
          limit: '5',
          status: 'pending'
        }
      }).subscribe({
        next: (response) => {
          this.recentReports = response.data.map((report: any) => ({
            id: `#R-${report.id}`,
            type: report.waste_type.join(', '),
            location: `${report.city}, ${report.state}`,
            date: this.formatDate(report.date),
            status: report.status.charAt(0).toUpperCase() + report.status.slice(1)
          }));
          this.isLoadingReports = false;
        },
        error: () => {
          this.errorReports = true;
          this.isLoadingReports = false;
        }
      });
    }, 800);
  }

  loadUpcomingEvents(): void {
    this.isLoadingEvents = true;
    this.errorEvents = false;
    
    // Simulate API call
    setTimeout(() => {
      this.http.get<any>('http://localhost:8000/events', {
        params: {
          status: 'upcoming'
        }
      }).subscribe({
        next: (events) => {
          this.upcomingEvents = events.slice(0, 3).map((event: any) => ({
            title: event.title,
            date: this.formatDate(event.date),
            location: event.location,
            volunteers: event.participants
          }));
          this.isLoadingEvents = false;
        },
        error: () => {
          this.errorEvents = true;
          this.isLoadingEvents = false;
        }
      });
    }, 1000);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  refreshData(): void {
    this.loadDashboardData();
  }

  viewReport(reportId: string): void {
    // Extract numeric ID from #R-123 format
    const id = reportId.replace('#R-', '');
    console.log(`Viewing report ${id}`);
    // In a real app, you would navigate to report details
  }

  viewEvent(eventTitle: string): void {
    console.log(`Viewing event ${eventTitle}`);
    // In a real app, you would navigate to event details
  }
}