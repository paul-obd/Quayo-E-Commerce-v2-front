import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { HttpRequestType } from '../constants/enums.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppTranslateService } from './app-translate.service';
import { ReportSchema } from '../models/reports/ReportSchema';
import { IndexedDbRowData } from '../models/IndexedDbRowData';
import { Response } from '../models/response.model';

// general constants
export const USER_CONTROLLER_NAME = 'api/user';
export const CLIENT_CONTROLLER_NAME = 'api/client';
export const ITEM_CONTROLLER_NAME = 'api/item';
export const WAREHOUSE_CONTROLLER_NAME = 'api/warehouse';
export const REPORT_SCHEMA_CONTROLLER_NAME = 'api/report/getschema';
export const MENU_SIDE_BAR_HEADER_CONTROLLER_NAME = 'api/MainView/GetMenuSideBarHeaderInfo';

@Injectable({ providedIn: 'root' })
export class IndexedDBService {
  // general variables
  public version = 0;


  constructor(
    private _apiRequestService: ApiRequestService,
    private _snackBar: MatSnackBar,
    private _translateService: AppTranslateService
  ) {}

  public async StoreUserModuleDB() {
    return this._apiRequestService
      .SendApiRequest(null, USER_CONTROLLER_NAME, HttpRequestType.GET, null)
      .toPromise()
      .then(async (resData) => {
        // tslint:disable-next-line: forin
        for (const Key in resData.response) {
          await this.CreateIndexedDB(resData, Key);
        }
      });
  }
  public async StoreClientModuleDB() {
    return this._apiRequestService
      .SendApiRequest(null, CLIENT_CONTROLLER_NAME, HttpRequestType.GET, null)
      .toPromise()
      .then(async (resData) => {
        // tslint:disable-next-line: forin
        for (const Key in resData.response) {
          await this.CreateIndexedDB(resData, Key);
        }
      });
  }
  public async StoreItemModuleDB() {
    return this._apiRequestService
      .SendApiRequest(null, ITEM_CONTROLLER_NAME, HttpRequestType.GET, null)
      .toPromise()
      .then(async (resData) => {
        // tslint:disable-next-line: forin
        for (const Key in resData.response) {
          await this.CreateIndexedDB(resData, Key);
        }
      });
  }
  public async StorePersonalUserInfo() {
    return this._apiRequestService
      .SendApiRequest(
        null,
        MENU_SIDE_BAR_HEADER_CONTROLLER_NAME,
        HttpRequestType.GET,
        null
      )
      .toPromise()
      .catch((error) => {
        const res = new Response();
        res.code = error.error.code;
        res.message = error.error.message;
        res.response = error;
        return res;
      });
  }
  public async StoreWarehouseDB() {
    return this._apiRequestService
      .SendApiRequest(null, WAREHOUSE_CONTROLLER_NAME, HttpRequestType.GET, null)
      .toPromise()
      .then(async (resData) => {
        // tslint:disable-next-line: forin
        for (const Key in resData.response) {
          await this.CreateIndexedDB(resData, Key);
        }
      });
  }
  public async StoreReportSchemaDB() {
    return this._apiRequestService
      .SendApiRequest(null, REPORT_SCHEMA_CONTROLLER_NAME, HttpRequestType.GET, null)
      .toPromise()
        .then(async (resData) => {

            var stringified = JSON.stringify(resData);
            const reportSchemaArray: Array<ReportSchema> = JSON.parse(stringified);

        const indexDbItem: Array<IndexedDbRowData> = [];
        for (const item of reportSchemaArray) {
          indexDbItem.push({ key: item.reportId, value: item});
        }

        await this.createIndexedDBAsync(indexDbItem, 'ReportSchema');
      });
  }


  public ClearIndexedDB() {
    const DBDeleteRequest = window.indexedDB.deleteDatabase('filter_lists_db');
    DBDeleteRequest.onerror = () => {
      this._snackBar.open(
        this._translateService.getTranslation('ERROR CLEAR INDEXED DB'),
        null,
        {
          duration: 2000,
          panelClass: ['error-snackbar'],
        }
      );
    };
  }

  public async CreateIndexedDB(resData: any, Key: string) {
    const key_name = Object.keys(Object.values(resData.response[Key])[0])[0];
    const table_name = Key.toString();
    const current_data = resData.response[Key];
    this.version = this.version + 1;
    const open = indexedDB.open('filter_lists_db', this.version);
    open.onupgradeneeded = function () {
      const db = open.result;
      const store = db.createObjectStore(table_name, {
        keyPath: key_name.toString(),
      });
    };
    open.onsuccess = function () {
      const db = open.result;
      const tx = db.transaction(table_name, 'readwrite');
      const store = tx.objectStore(table_name);
      if (table_name === 'users') {
        let user_name = 'No User';
        const login_code = localStorage.getItem('user_code');
        for (let j = 0; j < current_data.length; j++) {
          store.put(current_data[j]);
          if (current_data[j].user_code === login_code) {
            user_name = current_data[j].description;
          }
        }
        localStorage.setItem('user_name', user_name);
      } else {
        for (let j = 0; j < current_data.length; j++) {
          store.put(current_data[j]);
        }
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
    open.onerror = function (ex) { };
  }





  public async createIndexedDBAsync(indexedDbData: Array<IndexedDbRowData>, tableName: string) {

    for (const indexedDbRowData of indexedDbData) {

    }

    const table_name = tableName;

    this.version = this.version + 1;
    const open = indexedDB.open('filter_lists_db', this.version);

    open.onupgradeneeded = function () {
      const db = open.result;
      const store = db.createObjectStore(table_name, {
        keyPath: 'id',
      });
    };
    open.onsuccess = function () {
      const db = open.result;
      const tx = db.transaction(table_name, 'readwrite');
      const store = tx.objectStore(table_name);
      for (let j = 0; j < indexedDbData.length; j++) {
        store.put({ id: indexedDbData[j].key, value: indexedDbData[j].value } );
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
    open.onerror = function (ex) { };
  }

}
