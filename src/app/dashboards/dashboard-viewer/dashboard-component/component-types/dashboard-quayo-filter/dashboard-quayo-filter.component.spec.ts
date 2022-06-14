import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuayoFilterComponent } from './dashboard-quayo-filter.component';

describe('DashboardQuayoFilterComponent', () => {
  let component: DashboardQuayoFilterComponent;
  let fixture: ComponentFixture<DashboardQuayoFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQuayoFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQuayoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
