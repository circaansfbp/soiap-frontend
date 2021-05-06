import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarAsistenciaComponent } from './filtrar-asistencia.component';

describe('FiltrarAsistenciaComponent', () => {
  let component: FiltrarAsistenciaComponent;
  let fixture: ComponentFixture<FiltrarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
