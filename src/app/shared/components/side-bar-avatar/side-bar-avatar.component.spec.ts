import { SideBarAvatarComponent } from './side-bar-avatar.component';
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

let component: SideBarAvatarComponent;
let fixture: ComponentFixture<SideBarAvatarComponent>;

describe('IconButton component', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ SideBarAvatarComponent ],
          imports: [ BrowserModule ],
          providers: [
              { provide: ComponentFixtureAutoDetect, useValue: true }
          ]
      });
      fixture = TestBed.createComponent(SideBarAvatarComponent);
      component = fixture.componentInstance;
  }));

  it('should do something', async(() => {
      expect(true).toEqual(true);
  }));
});
