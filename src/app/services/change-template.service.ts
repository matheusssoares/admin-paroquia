import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeTemplateService {
  private isDisplayBaseTemplate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private meuSubject = new Subject<string>();

  meuDado$ = this.meuSubject.asObservable();

  updateEvent(value: string) {
    this.meuSubject.next(value);
    this.detectChange();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private toastrService: NbToastrService
  ) { }
  

  changeTemplate(value: boolean) {
    this.isDisplayBaseTemplate.next(value);
  }

  getChangeTemplate() {
    return this.isDisplayBaseTemplate.asObservable();
  }

  showToastr(description: string, title: string, config: Partial<NbToastrConfig>) {
    this.toastrService.show(description, title, config);
  }
  detectChange() {
    this.cdr.detectChanges();
  }

}
