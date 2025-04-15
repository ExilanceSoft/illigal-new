import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StatusDialogComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  dashboardStats = {
    pendingReports: 0,
    totalReports: 0,
    activeVolunteers: 0
  };
  recentReports: any[] = [];
  isLoading = true;
  statusOptions = ['Pending', 'In Progress', 'Completed', 'Rejected'];

  displayedColumns = ['id', 'location', 'status', 'actions'];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  // Add this method to handle status class
  getStatusClass(status: string): string {
    const statusMap: {[key: string]: string} = {
      'Pending': 'pending',
      'In Progress': 'in-progress',
      'Completed': 'completed',
      'Rejected': 'rejected'
    };
    return statusMap[status] || 'pending';
  }

  fetchDashboardData(): void {
    this.isLoading = true;
    
    this.http.get<any>('http://127.0.0.1:8000/reports/stats/').subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        this.fetchRecentReports();
      },
      error: (error) => {
        this.showError('Failed to load dashboard statistics');
        this.isLoading = false;
      }
    });
  }

  fetchRecentReports(): void {
    this.http.get<any>('http://127.0.0.1:8000/reports/?limit=5').subscribe({
      next: (response) => {
        this.recentReports = response.data.map((report: any) => ({
          id: report.id,
          location: `${report.location}, ${report.city}`,
          status: this.capitalizeFirstLetter(report.status),
          originalData: report
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Failed to load recent reports');
        this.isLoading = false;
      }
    });
  }

  openStatusDialog(report: any): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '350px',
      data: {
        currentStatus: report.status,
        statusOptions: this.statusOptions
      }
    });

    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus) {
        this.updateReportStatus(report.id, newStatus);
      }
    });
  }

  updateReportStatus(reportId: number, newStatus: string): void {
    const statusUpdate = { status: newStatus.toLowerCase() };
    
    this.http.patch(`http://127.0.0.1:8000/reports/${reportId}/status/`, statusUpdate)
      .subscribe({
        next: () => {
          this.snackBar.open('Status updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.fetchRecentReports();
          this.fetchDashboardData(); // Refresh stats
        },
        error: (error) => {
          this.showError('Failed to update status');
        }
      });
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  viewReport(report: any): void {
    this.router.navigate(['/reports', report.id]);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}