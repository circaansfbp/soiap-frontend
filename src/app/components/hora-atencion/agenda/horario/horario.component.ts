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

  // Horas predeterminadas
  horas: string[] = ["08:00:00", "08:50:00", "09:40:00", "10:30:00", "11:20:00", "12:10:00", "13:00:00",
    "15:00:00", "15:50:00", "16:40:00", "17:30:00", "18:20:00", "19:10:00", "20:00:00"];

  // Horarios del día (disponibles y ocupados)
  horasAtencion: Array<HorarioAtencion> = new Array();
  horasFechaDelDia: Array<HorarioAtencion> = new Array(); // Array que contiene los horarios del día
  horario: HorarioAtencion = new HorarioAtencion();

  constructor(private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    this.horario.paciente = new Paciente();
  }

  ngOnChanges(): void {
    this.horasFechaDelDia = [];
    this.horasAtencion = [];
    this.getAtencionesFechaActual(this.fechaActual);
  }

  // Crear los horarios del día (disponibles y ocupados)
  availableHours() {

    // Si existen horarios para la fecha especificada
    if (this.horasFechaDelDia.length != 0) {

      this.horas.forEach((hora) => {
        this.horasFechaDelDia.forEach((horaTomada) => {
          if (hora != horaTomada.horaAtencion) {
            this.horasAtencion.push(this.horario = {
              'idAtencion': 0,
              'asistencia': false,
              'confirmaAsistencia': false,
              'horaAtencion': hora,
              'fechaAtencion': this.fechaActual,
              'nroConsulta': 0,
              'disponible': true,
              'paciente': new Paciente()
            });
          } else this.horasAtencion.push(horaTomada);
        });
      });

    } else { // Si no existen horarios, se crean objetos HorarioAtencion vacíos, disponibles para agendar

      this.horas.forEach((hora) => {
        this.horasAtencion.push(this.horario = {
          'idAtencion': 0,
          'asistencia': false,
          'confirmaAsistencia': false,
          'horaAtencion': hora,
          'fechaAtencion': this.fechaActual,
          'nroConsulta': 0,
          'disponible': true,
          'paciente': new Paciente()
        });
      });

    }

    console.log(this.horasAtencion);
  }

  // Obtiene las atenciones del día 
  getAtencionesFechaActual(fechaActual: string) {
    return this.horarioAtencionService.obtenerHorariosDelDía(fechaActual).subscribe((res: any) => {
      res.forEach((horario: HorarioAtencion) => this.horasFechaDelDia.push(horario));

      // Luego de obtener las horas del día, se llama para todos los horarios del día (disponibles y ocupados)
      this.availableHours();
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
        horarioAtencion.disponible = true;
        this.horarioAtencionService.eliminarHorario(idAtencion).subscribe(res => console.log(res));

        swal.fire(
          'Horario eliminado!',
          'La hora de atención ha sido eliminada.',
          'success'
        );
      }
    });
  }
}
