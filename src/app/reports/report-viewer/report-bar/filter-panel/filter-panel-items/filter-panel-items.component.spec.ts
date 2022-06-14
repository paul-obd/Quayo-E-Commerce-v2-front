/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FilterPanelItemsComponent } from './filter-panel-items.component';

let component: FilterPanelItemsComponent;
let fixture: ComponentFixture<FilterPanelItemsComponent>;

describe('FilterPanelItems component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FilterPanelItemsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FilterPanelItemsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});