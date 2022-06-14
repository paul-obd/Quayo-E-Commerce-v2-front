import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessage } from '../models/error-message.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
  EmptyError: ErrorMessage = {
    status: 0,
    statusText: 'No Error',
    message: '',
  };
  private message = new BehaviorSubject(this.EmptyError);
  sharedMessage = this.message.asObservable();

  constructor() {}

  nextMessage(message: ErrorMessage) {
    this.message.next(message);
  }
}
