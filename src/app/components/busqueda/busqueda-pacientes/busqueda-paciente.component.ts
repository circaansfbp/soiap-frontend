import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-busqueda-paciente',
  templateUrl: './busqueda-paciente.component.html',
  styleUrls: ['./busqueda-paciente.component.css']
})
export class BusquedaPacienteComponent implements OnInit {

  @Output() searchPatientEvent = new EventEmitter<{nombre: string, apellido: string}>();

  constructor() { }

  ngOnInit(): void {
  }

  eventEmitter(nombrePaciente: string, apellidoPaciente: string) {
    this.searchPatientEvent.emit({nombre: nombrePaciente, apellido: apellidoPaciente});
  }  

}
