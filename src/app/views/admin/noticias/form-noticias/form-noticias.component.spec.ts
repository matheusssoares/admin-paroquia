import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoticiasComponent } from './form-noticias.component';

describe('FormNoticiasComponent', () => {
  let component: FormNoticiasComponent;
  let fixture: ComponentFixture<FormNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
