import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpRequestType } from '../../../shared/constants/enums.constant';
import { USER_CONTROLLER_NAME } from '../../../shared/services/indexed-db.service';
import { SnackBarService } from '../../../shared/services/common/snackBarService';
import { QuayoExceptionResponse } from '../../../shared/models/quayoExceptionResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  public lang: string;
  constructor(
    private apiService: ApiRequestService,
    private translate: TranslateService,
    private _snackBarService: SnackBarService,
    private _apiRequestService: ApiRequestService
  ) { }

  onEnglishClick() {
    this.languageChange('en');
  }
  onFrenchClick() {
    this.languageChange('fr');
  }
  onArabicClick() {
    this.languageChange('ar')
  }

  getLanguage(): string {
    return localStorage.getItem('lang');
  }

  changeTranslation(language: string){
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  languageChange(language: string) {
    let languageParam = { "language": language };

    this._apiRequestService.SendApiRequest(languageParam, USER_CONTROLLER_NAME + '/language', HttpRequestType.POST, null)
      .subscribe(respone => {
        localStorage.setItem('lang', language);
        this.changeTranslation(language)
        window.location.reload();
        // window.location.reload(true);
      },
        error => {
          let quayoExceptionResponse = error as QuayoExceptionResponse;
          if (quayoExceptionResponse.ExceptionType) {
            this._snackBarService.openSnackBar(quayoExceptionResponse.UserMessage, 'custom_icon_technical_exception');
          }
          else {
            this._snackBarService.openSnackBar('NO CONNECTION', 'custom_icon_technical_exception',3,true);
          }
        }
      );
  }

  onProfile() {
    const open = indexedDB.open('filter_lists_db');
    open.onsuccess = function () {
      const db = open.result;
      const tx = db.transaction('client_list', 'readonly');
      const store = tx.objectStore('client_list');
      const request = store.getAll();
      request.onsuccess = function (event) { };
    };
  }
}
