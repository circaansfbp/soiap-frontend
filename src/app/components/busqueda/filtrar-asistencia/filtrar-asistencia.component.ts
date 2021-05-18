import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtrar-asistencia',
  templateUrl: './filtrar-asistencia.component.html',
  styleUrls: ['./filtrar-asistencia.component.css']
})
export class FiltrarAsistenciaComponent implements OnInit {

  @Output() filterEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  filter(value: number) {
    this.filterEvent.emit(value);
  }

}
