/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReportBarComponent } from './report-bar.component';

let component: ReportBarComponent;
let fixture: ComponentFixture<ReportBarComponent>;

describe('ReportBar component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReportBarComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ReportBarComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
