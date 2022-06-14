import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDatePeriodFilterComponent } from './dashboard-date-period-filter.component';

describe('DashboardDatePeriodFilterComponent', () => {
  let component: DashboardDatePeriodFilterComponent;
  let fixture: ComponentFixture<DashboardDatePeriodFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDatePeriodFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDatePeriodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
