import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private horarioAtencionService: HorarioAtencionService,
    private router: Router) { }

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
  confirmaAsistencia(value: number) {
    if (value == 1) {
      swal.fire({
        title: 'Registrar confirmación de asistencia',
        text: '¿El paciente confirmó su asistencia con antelación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007f5f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, el paciente confirmó su asistencia',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.horario.confirmaAsistencia = 1;

          this.horarioAtencionService.modificarHorario(this.horario).subscribe(updatedHorario => {
            console.log(updatedHorario);

            swal.fire(
              'Confirmación de asistencia registrada!',
              'La confirmación de asistencia por parte del paciente se ha registrado exitosamente.',
              'success'
            );
          });
        }
      });
    } else if (value == -1) {
      swal.fire({
        title: 'Registrar confirmación de asistencia',
        text: '¿El paciente no confirmó su asistencia con antelación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007f5f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No, el paciente no confirmó su asistencia',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.horario.confirmaAsistencia = -1;

          this.horarioAtencionService.modificarHorario(this.horario).subscribe(updatedHorario => {
            console.log(updatedHorario);

            swal.fire(
              'Falta de confirmación registrada',
              'La falta de confirmación de asistencia por parte del paciente ha sido registrada.',
              'success'
            );
          });
        }
      });
    }
  }

  // Registra la asistencia del paciente
  asistencia(value: number) {
    if (value == 1) {
      swal.fire({
        title: 'Registrar asistencia',
        text: '¿El paciente asiste a su hora de atención?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007f5f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, el paciente asiste a su hora de atención',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.horario.asistencia = 1;

          this.horarioAtencionService.modificarHorario(this.horario).subscribe(updatedHorario => {
            console.log(updatedHorario);

            swal.fire(
              "Asistencia registrada!",
              "La asistencia del paciente a su hora de atención ha sido registrada exitosamente",
              "success"
            );
          });
        }
      });
    } else if (value == -1) {
      swal.fire({
        title: 'Registrar asistencia',
        text: '¿El paciente falta a su hora de atención?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007f5f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, el paciente falta a su hora de atención',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.horario.asistencia = -1;

          this.horarioAtencionService.modificarHorario(this.horario).subscribe(updatedHorario => {
            console.log(updatedHorario);

            swal.fire(
              "Falta de asistencia registrada",
              "La falta de asistencia a su hora de atención por parte del paciente ha sido registrada",
              "success"
            );
          });
        }
      });
    }
  }

  // Método para verificar la viabilidad de eliminar un horario
  verifyDeletion(idAtencion: number) {

    this.horarioAtencionService.obtenerHorario(idAtencion).subscribe(horario => {
      let hourToDelete = horario;

      if (hourToDelete) {

        // Si la fecha del horario de atención corresponde a una ya pasada, no se elimina
        if (moment(hourToDelete.fechaAtencion).isBefore(moment().subtract(1, 'days'))) {
          swal.fire(
            "No es posible eliminar el horario!",
            "No se puede eliminar un horario de atención pasado.",
            "error"
          );

          return;
        }

        // Si la fecha de atención corresponde a una futura, pero está ya pagada, no se elimina.
        // Sin embargo, se le permite al usuario modificar el horario de atención ya creado, de ser necesario.
        else if (moment(hourToDelete.fechaAtencion).isAfter(moment().subtract(1, 'days')) && hourToDelete.pago) {
          swal.fire({
            title: 'Horario de atención pagado!',
            text: 'El horario de atención que desea eliminar ya está pagado, por lo que no es posible eliminarlo. Sin embargo, puede asignarle un nuevo horario de atención al paciente.',
            icon: 'warning',
            confirmButtonColor: '#007f5f',
            confirmButtonText: 'Asignar nuevo horario',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
          }).then(result => {
            if (result.isConfirmed) {
              this.router.navigate(['nuevo-horario', hourToDelete.idAtencion]);
            }
          });
        }
        else this.eliminarHorario(idAtencion);
      }
    });
  }

  // Permite eliminar un horario de atención
  eliminarHorario(idAtencion: number) {
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
          console.log(res);

          // Para que el horario eliminado sea removido de la vista.
          this.horasFechaDelDia = [];
          this.getAtencionesFechaActual(this.fechaActual);

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
