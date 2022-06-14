import { EventEmitter } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { DashboardComponent } from "../../../dashboards/dashboard-viewer/dashboard-component/dashboard-component";

export class RefreshComponentFacade {
    private component: DashboardComponent;
    private isContinuous: boolean = false;
    private datasourceObservable: Observable<any>;
    private dataHashCode: string;
    private subscription: Subscription;

    constructor(component: DashboardComponent, datasourceObservable: Observable<any>, initialDataHashCode: string) {
        this.component = component;
        this.datasourceObservable = datasourceObservable;
        this.dataHashCode = initialDataHashCode;
    }

    setIsContinuous(status: boolean) {
        this.isContinuous = status;
        if (status == true) {
            this.refresh();
        }
    }

    getComponent() {
        return this.component;
    }

    getComponentDataHashCode() {
        return this.dataHashCode;
    }

    private refresh() {
        var timeInterval = this.component.Properties.timeInterval;

        if (timeInterval != -1) {
            this.invokeDatasource(true, true, true);

            if (this.component.Properties.timeInterval != 0) {
                let timerId = setInterval(() => {
                    if (this.isContinuous) {
                        this.invokeDatasource(false, false, true);
                    }
                    else {
                        clearInterval(timerId)
                    }
                }
                    , this.component.Properties.timeInterval * 1000);
            }
        }

    }

    invokeDatasource(withLoadingSpinner: boolean, withErrorMode: boolean, withChangeNotification: boolean): EventEmitter<any> {
        let eventEmitter = new EventEmitter<any>();

        if (this.subscription) { this.subscription.unsubscribe(); this.subscription = undefined; }

        this.subscription = this.invokeDatasourceObservable(withLoadingSpinner, withErrorMode, withChangeNotification).subscribe(data => {
            eventEmitter.emit(data);
        });

        return eventEmitter;
    }

    private invokeDatasourceObservable(withLoadingSpinner: boolean, withErrorMode: boolean, withChangeNotification: boolean): Observable<any> {
        this.component.setChangeNotoficationLock(!withChangeNotification)
        if (this.component.isErrorInConnection) {
            withLoadingSpinner = true;
        }
        this.component.setLoadingMode(withLoadingSpinner);
        this.component.setErrorMode(false);

        return this.datasourceObservable.pipe(map(data => {
            if (this.dataHashCode != data.dataHashCode) {
                data.data = JSON.parse(data.data);
                this.component.setDatasource(data.data);
                this.dataHashCode = data.dataHashCode;
            }
            this.component.setLoadingMode(false);
            return data.data;
        }))
            .pipe(catchError(error => {
                this.component.setLoadingMode(false);
                this.component.setErrorMode(withErrorMode);
                return of(error);
            }));
    }
}
