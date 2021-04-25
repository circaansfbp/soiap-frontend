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

  // Para manejar la fecha y hora de la atención al ver el detalle de esta
  fecha!: string;
  hora!: string;

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
    this.fecha = moment(this.horario.fechaAtencion).format("dddd Do MMMM YYYY");
    this.hora = `${this.horario.horaAtencion.slice(0, 5)} hrs.`;
  }

  // Registra la confirmación de asistencia por parte del paciente
  confirmaAsistencia() {
    swal.fire({
      title: 'Confirmación de asistencia.',
      text: '¿Desea registrar la confirmación de asistencia a su sesión por parte del paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.horario.confirmaAsistencia = true;
        swal.fire("Confirmación registrada!", "La confirmación se ha registrado exitosamente.", "success");
      }
    });
  }

  // Registra la asistencia del paciente
  asistencia(value: boolean) {
    if (value) {
      swal.fire({
        title: 'Registrar asistencia',
        text: '¿El paciente asistió a su sesión de terapia?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, el paciente asistió',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.horario.asistencia = true;
          swal.fire("Asistencia registrada!", "La asistencia del paciente ha sido registrada exitosamente", "success");
        }
      });
    } else {
      swal.fire({
        title: 'Registrar asistencia',
        text: '¿El paciente faltó a su sesión de terapia?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, el paciente faltó',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.horario.asistencia = false;
          swal.fire("La falta de asistencia ha sido registrada", "La falta de asistencia por parte del paciente ha sido registrada exitosamente", "success");
        }
      });
    }
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
