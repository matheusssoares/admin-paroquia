import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  public update = new BehaviorSubject<string>('');

  constructor() {}

  setUpdate(value: string) {
    if (value != '') {
      this.update.next(value);
    }
  }

  getSubject() {
    return this.update.asObservable();
  }
}
