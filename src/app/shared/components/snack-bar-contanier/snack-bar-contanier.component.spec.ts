import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarContanierComponent } from './snack-bar-contanier.component';

describe('SnackBarContanierComponent', () => {
  let component: SnackBarContanierComponent;
  let fixture: ComponentFixture<SnackBarContanierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarContanierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarContanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
