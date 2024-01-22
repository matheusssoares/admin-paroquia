import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeTemplateService {
  private isDisplayBaseTemplate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef 
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
