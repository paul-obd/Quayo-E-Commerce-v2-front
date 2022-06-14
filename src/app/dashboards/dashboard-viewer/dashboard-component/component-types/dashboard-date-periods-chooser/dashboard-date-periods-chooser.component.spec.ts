import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDatePeriodsChooserComponent } from './dashboard-date-periods-chooser.component';

describe('DashboardDatePeriodsChooserComponent', () => {
  let component: DashboardDatePeriodsChooserComponent;
  let fixture: ComponentFixture<DashboardDatePeriodsChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDatePeriodsChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDatePeriodsChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
