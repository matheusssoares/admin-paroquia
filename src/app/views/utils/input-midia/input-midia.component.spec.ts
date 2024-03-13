import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMidiaComponent } from './input-midia.component';

describe('InputMidiaComponent', () => {
  let component: InputMidiaComponent;
  let fixture: ComponentFixture<InputMidiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMidiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMidiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
