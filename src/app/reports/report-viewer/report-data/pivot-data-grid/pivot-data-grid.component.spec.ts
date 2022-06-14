import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotDataGridComponent } from './pivot-data-grid.component';

describe('PivotDataGridComponent', () => {
  let component: PivotDataGridComponent;
  let fixture: ComponentFixture<PivotDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
