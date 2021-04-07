import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHorarioFormComponent } from './nuevo-horario-form.component';

describe('NuevoHorarioFormComponent', () => {
  let component: NuevoHorarioFormComponent;
  let fixture: ComponentFixture<NuevoHorarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoHorarioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoHorarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
