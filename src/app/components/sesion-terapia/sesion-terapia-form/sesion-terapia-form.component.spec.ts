import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionTerapiaFormComponent } from './sesion-terapia-form.component';

describe('SesionTerapiaFormComponent', () => {
  let component: SesionTerapiaFormComponent;
  let fixture: ComponentFixture<SesionTerapiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionTerapiaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionTerapiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
