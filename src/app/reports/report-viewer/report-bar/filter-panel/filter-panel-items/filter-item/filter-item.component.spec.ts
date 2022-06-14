/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FilterItemComponent } from './filter-item.component';

let component: FilterItemComponent;
let fixture: ComponentFixture<FilterItemComponent>;

describe('FilterItem component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FilterItemComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FilterItemComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});