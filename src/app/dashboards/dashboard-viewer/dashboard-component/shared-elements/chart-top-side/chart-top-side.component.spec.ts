import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopSideComponent } from './chart-top-side.component';

describe('ChartTopSideComponent', () => {
  let component: ChartTopSideComponent;
  let fixture: ComponentFixture<ChartTopSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTopSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTopSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
