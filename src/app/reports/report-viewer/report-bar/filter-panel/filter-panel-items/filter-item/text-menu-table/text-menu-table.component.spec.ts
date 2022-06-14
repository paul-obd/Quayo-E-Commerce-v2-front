/// <reference path="../../../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TextMenuTableComponent } from './text-menu-table.component';

let component: TextMenuTableComponent;
let fixture: ComponentFixture<TextMenuTableComponent>;

describe('TextMenuTable component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TextMenuTableComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TextMenuTableComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});