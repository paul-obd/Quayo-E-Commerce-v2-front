/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ReportViewerComponent } from './report-viewer.component';

let component: ReportViewerComponent;
let fixture: ComponentFixture<ReportViewerComponent>;

describe('ReportViewer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReportViewerComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ReportViewerComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});