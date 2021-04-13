import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { HorarioAtencionService } from 'src/app/services/horario-atencion.service';
import swal from 'sweetalert2';

moment.locale("es");

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horasFechaDelDia: Array<HorarioAtencion> = new Array(); // Array que contiene los horarios del día
  fechaActual: string = moment().format("YYYY[-]M[-]D"); // Fecha del día
  horario: HorarioAtencion = new HorarioAtencion();

  constructor(private router: Router,
    private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    this.getAtencionesFechaActual(this.fechaActual);
    this.horario.paciente = new Paciente();
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
  // FALTA REMOVER EL HORARIO DE LA VISTA CUANDO ESTE ES ELIMINADO
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

        swal.fire(
          'Horario eliminado!',
          'La hora de atención ha sido eliminada.',
          'success'
        );
        
        this.horarioAtencionService.eliminarHorario(idAtencion).subscribe(res => console.log(res));
      }
    });
  }
}
