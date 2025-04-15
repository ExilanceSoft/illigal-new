import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatOptionModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'location', 'date', 'status', 'actions'];
  dataSource: any[] = [];
  filteredReports: any[] = [];
  statuses = ['All', 'Pending', 'In Progress', 'Completed', 'Rejected'];
  selectedStatus = 'All';
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.isLoading = true;
    this.http.get<any>('http://127.0.0.1:8000/reports/')
      .subscribe({
        next: (response) => {
          this.dataSource = response.data.map((report: any) => ({
            id: report.id,
            type: report.waste_type.join(', '),
            location: `${report.location}, ${report.city}, ${report.state}`,
            date: report.date,
            status: this.capitalizeFirstLetter(report.status),
            originalData: report
          }));
          this.filteredReports = [...this.dataSource];
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Failed to load reports', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredReports = this.dataSource.filter(report => 
      report.id.toString().includes(filterValue) ||
      report.type.toLowerCase().includes(filterValue) ||
      report.location.toLowerCase().includes(filterValue)
    );
  }

  viewReport(report: any): void {
    this.router.navigate(['/reports', report.id]);
  }

  createNewReport(): void {
    this.router.navigate(['/reports/new']);
  }
}