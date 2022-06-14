import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDateFilterComponent } from './dashboard-date-filter.component';

describe('DashboardDateFilterComponent', () => {
  let component: DashboardDateFilterComponent;
  let fixture: ComponentFixture<DashboardDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
