/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FilterPanelComponent } from './filter-panel.component';

let component: FilterPanelComponent;
let fixture: ComponentFixture<FilterPanelComponent>;

describe('FilterPanel component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FilterPanelComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FilterPanelComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});