import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-busqueda-fecha',
  templateUrl: './busqueda-fecha.component.html',
  styleUrls: ['./busqueda-fecha.component.css']
})
export class BusquedaFechaComponent implements OnInit {

  @Output() searchDateEvent = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  eventEmitter(date: any) {
    this.searchDateEvent.emit(date);
  }
}
