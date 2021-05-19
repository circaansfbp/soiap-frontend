import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filtrar-asistencia',
  templateUrl: './filtrar-asistencia.component.html',
  styleUrls: ['./filtrar-asistencia.component.css']
})
export class FiltrarAsistenciaComponent implements OnInit {

  // Para setear el título del componente
  @Input() title!: string;

  // Recibe las opciones a desplegar en el select
  @Input() options: any[] = new Array();

  // Envía el evento al padre
  @Output() filterEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  filter(value: number) {
    this.filterEvent.emit(value);
  }

}
