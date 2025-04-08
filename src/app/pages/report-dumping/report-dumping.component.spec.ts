import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDumpingComponent } from './report-dumping.component';

describe('ReportDumpingComponent', () => {
  let component: ReportDumpingComponent;
  let fixture: ComponentFixture<ReportDumpingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDumpingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDumpingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
