import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaFechaComponent } from './busqueda-fecha.component';

describe('BusquedaFechaComponent', () => {
  let component: BusquedaFechaComponent;
  let fixture: ComponentFixture<BusquedaFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
