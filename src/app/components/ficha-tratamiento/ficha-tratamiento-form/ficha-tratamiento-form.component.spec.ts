import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTratamientoFormComponent } from './ficha-tratamiento-form.component';

describe('FichaTratamientoFormComponent', () => {
  let component: FichaTratamientoFormComponent;
  let fixture: ComponentFixture<FichaTratamientoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaTratamientoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaTratamientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
