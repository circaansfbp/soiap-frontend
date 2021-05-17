import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTratamientoComponent } from './ficha-tratamiento.component';

describe('FichaTratamientoComponent', () => {
  let component: FichaTratamientoComponent;
  let fixture: ComponentFixture<FichaTratamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaTratamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
