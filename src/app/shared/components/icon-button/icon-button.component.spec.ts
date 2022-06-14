/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { IconButtonComponent } from './icon-button.component';

let component: IconButtonComponent;
let fixture: ComponentFixture<IconButtonComponent>;

describe('IconButton component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ IconButtonComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(IconButtonComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
