import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeTemplateService {
  private isDisplayBaseTemplate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  changeTemplate(value: boolean) {
    this.isDisplayBaseTemplate.next(value);
  }

  getChangeTemplate() {
    return this.isDisplayBaseTemplate.asObservable();
  }
}
