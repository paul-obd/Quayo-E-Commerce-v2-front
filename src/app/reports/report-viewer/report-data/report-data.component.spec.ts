/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ReportDataComponent } from './report-data.component';

let component: ReportDataComponent;
let fixture: ComponentFixture<ReportDataComponent>;

describe('ReportData component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReportDataComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ReportDataComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});