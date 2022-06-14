import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDataGridComponent } from './standard-data-grid.component';

describe('StandardDataGridComponent', () => {
  let component: StandardDataGridComponent;
  let fixture: ComponentFixture<StandardDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
