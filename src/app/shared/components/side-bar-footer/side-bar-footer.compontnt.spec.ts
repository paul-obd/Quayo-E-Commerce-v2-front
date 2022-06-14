import { SideBarFooterComponent } from './side-bar-footer.component';
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

let component: SideBarFooterComponent;
let fixture: ComponentFixture<SideBarFooterComponent>;

describe('IconButton component', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ SideBarFooterComponent ],
          imports: [ BrowserModule ],
          providers: [
              { provide: ComponentFixtureAutoDetect, useValue: true }
          ]
      });
      fixture = TestBed.createComponent(SideBarFooterComponent);
      component = fixture.componentInstance;
  }));

  it('should do something', async(() => {
      expect(true).toEqual(true);
  }));
});
