import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSelectItemsComponent } from './dashboard-select-items.component';

describe('DashboardSelectItemsComponent', () => {
  let component: DashboardSelectItemsComponent;
  let fixture: ComponentFixture<DashboardSelectItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSelectItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSelectItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
