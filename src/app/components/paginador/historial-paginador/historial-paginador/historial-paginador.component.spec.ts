import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPaginadorComponent } from './historial-paginador.component';

describe('HistorialPaginadorComponent', () => {
  let component: HistorialPaginadorComponent;
  let fixture: ComponentFixture<HistorialPaginadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPaginadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPaginadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
