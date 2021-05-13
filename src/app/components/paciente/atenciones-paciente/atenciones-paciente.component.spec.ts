import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesPacienteComponent } from './atenciones-paciente.component';

describe('AtencionesPacienteComponent', () => {
  let component: AtencionesPacienteComponent;
  let fixture: ComponentFixture<AtencionesPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionesPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
