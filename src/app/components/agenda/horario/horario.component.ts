import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { HorarioAtencionService } from 'src/app/services/horario-atencion.service';

moment.locale("es");

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horasFechaDelDia: Array<HorarioAtencion> = new Array();
  fechaActual: string = moment().format("YYYY[-]M[-]D");
  detalleHora: HorarioAtencion = new HorarioAtencion();

  constructor(private router: Router,
              private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    this.getAtencionesFechaActual(this.fechaActual);
    this.detalleHora.paciente = new Paciente();
  }

  // Obtiene las atenciones del día 
  getAtencionesFechaActual(fechaActual: string) {
    return this.horarioAtencionService.obtenerHorariosDelDía(fechaActual).subscribe((res: any) => {
      res.forEach((horario: HorarioAtencion) => this.horasFechaDelDia.push(horario));
    });
  }

  // Permite ver el detalle de las atenciones del día
  verDetalle(horarioAtencion: HorarioAtencion) {
    this.detalleHora = horarioAtencion;
  }
}
