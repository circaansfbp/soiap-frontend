import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSesionesComponent } from './lista-sesiones.component';

describe('ListaSesionesComponent', () => {
  let component: ListaSesionesComponent;
  let fixture: ComponentFixture<ListaSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSesionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
