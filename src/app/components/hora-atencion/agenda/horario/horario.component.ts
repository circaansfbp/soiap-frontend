import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';

import * as moment from 'moment';
import swal from 'sweetalert2';

moment.locale("es");

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit, OnChanges {

  // Fecha del día (obtenida desde componente agenda)
  @Input() fechaActual!: string;

  // Para guardar los horarios del día
  horasFechaDelDia: Array<HorarioAtencion> = new Array();

  horario: HorarioAtencion = new HorarioAtencion();

  constructor(private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    this.horario.paciente = new Paciente();
  }

  ngOnChanges(): void {
    this.horasFechaDelDia = [];
    this.getAtencionesFechaActual(this.fechaActual);
  }

  // Obtiene las atenciones del día 
  getAtencionesFechaActual(fechaActual: string) {
    return this.horarioAtencionService.obtenerHorariosDelDía(fechaActual).subscribe((res: any) => {
      res.forEach((horario: HorarioAtencion) => this.horasFechaDelDia.push(horario));
    });
  }

  // Permite ver el detalle de las atenciones del día
  verDetalle(horarioAtencion: HorarioAtencion) {
    this.horario = horarioAtencion;
  }

  // Permite eliminar un horario de atención
  eliminarHorario(idAtencion: number, horarioAtencion: HorarioAtencion) {
    swal.fire({
      title: '¿Eliminar este horario?',
      text: 'Esta acción es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioAtencionService.eliminarHorario(idAtencion).subscribe(res => {

          // AL ELIMINAR UN HORARIO ESTE DEBE SER REMOVIDO DE LA VISTA

          swal.fire(
            'Horario eliminado!',
            'La hora de atención ha sido eliminada.',
            'success'
          );
        });
      }
    });
  }
}
