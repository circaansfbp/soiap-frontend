import { Component, Input, OnInit } from '@angular/core';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { Pago } from 'src/app/classes/pago/pago';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  @Input() horarioAtencion: HorarioAtencion = new HorarioAtencion();
  @Input() paciente: Paciente = new Paciente();

  constructor() { }

  ngOnInit(): void {

  }

}
