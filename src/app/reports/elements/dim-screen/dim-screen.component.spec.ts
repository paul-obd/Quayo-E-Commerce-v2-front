/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { DimScreenComponent } from './dim-screen.component';

let component: DimScreenComponent;
let fixture: ComponentFixture<DimScreenComponent>;

describe('DimScreen component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DimScreenComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(DimScreenComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});