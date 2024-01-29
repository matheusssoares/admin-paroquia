import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgendasComponent } from './form-agendas.component';

describe('FormAgendasComponent', () => {
  let component: FormAgendasComponent;
  let fixture: ComponentFixture<FormAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAgendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
