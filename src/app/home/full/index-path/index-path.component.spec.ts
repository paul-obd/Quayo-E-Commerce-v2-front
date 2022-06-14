import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPathComponent } from './index-path.component';

describe('IndexPathComponent', () => {
  let component: IndexPathComponent;
  let fixture: ComponentFixture<IndexPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
