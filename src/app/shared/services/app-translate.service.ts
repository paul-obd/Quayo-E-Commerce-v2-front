import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AppTranslateService {
  private _result = '';
  constructor(private _translate: TranslateService) {}
  getTranslation(key: string): string {
    this._translate.get(key).subscribe((res: string) => {
      this._result = res;
    });
    return this._result;
  }
}
