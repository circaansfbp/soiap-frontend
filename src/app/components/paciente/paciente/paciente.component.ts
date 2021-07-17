import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';
import * as moment from 'moment';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';
moment.locale('es');

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  // Obtiene la fecha actual, para calcular la edad
  today = moment();

  // Representa al paciente 
  paciente: Paciente = new Paciente();

  // Para desplegar la fecha de nacimiento
  birthday!: string;

  // Para desplegar la fecha de la anamnesis
  fechaAnamnesis!: string;

  // Para desplegar la fecha en la que se creó la ficha de tratamiento del paciente
  fechaCreacionFichaTratamiento!: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;

          if (this.paciente.fechaNacimiento != null)
            this.birthday = moment(this.paciente.fechaNacimiento).format("dddd Do MMMM YYYY");

          else this.birthday = "-";

          if (this.paciente.anamnesis != undefined) this.fechaAnamnesis = moment(this.paciente.anamnesis.fechaAnamnesis).format("dddd Do MMMM YYYY");
          if (this.paciente.fichaTratamiento != undefined) this.fechaCreacionFichaTratamiento = moment(this.paciente.fichaTratamiento.fechaDiagnostico).format("dddd Do MMMM YYYY");

          if (this.paciente.email == null) this.paciente.email = "-";
        });
      }
    });
  }

  // Para calcular la edad del paciente
  age(): any {
    if (this.paciente.fechaNacimiento != null)
      return Math.abs(moment(this.paciente.fechaNacimiento).diff(this.today, 'years'));

    else return "-";
  }

  // Permite la eliminación lógica de un paciente
  deletePatient() {
    let debt = 0;
    let atencionesFuturasPagadas = 0;
    let atencionesAgendadas = 0;

    // Si el paciente tiene deudas pendientes, no debiese ser eliminado.
    if (this.paciente.atenciones.length > 0) {
      this.paciente.atenciones.forEach(atencion => {
        if (atencion.pago == null && atencion.asistencia == 1) {
          debt++;
        }

        // Si tiene atenciones agendadas y pagadas
        if (atencion.asistencia == 0 && atencion.pago) {
          atencionesFuturasPagadas++;
        }

        // Si tiene atenciones agendadas, pero no pagadas
        if (moment(atencion.fechaAtencion).isAfter(moment()) && !atencion.pago) {
          atencionesAgendadas++;
        }
      });

      if (debt > 0) {
        swal.fire(
          "No es posible eliminar al paciente!",
          "El/La paciente presenta un total de " + debt + " atenciones asistidas y no pagadas, por lo que no puede ser eliminado/a.",
          "info"
        );

        return;
      }

      else if (atencionesFuturasPagadas > 0) {
        swal.fire(
          "Paciente en tratamiento!",
          "El/la paciente tiene " + atencionesFuturasPagadas + " atenciones agendadas y pagadas, por lo que no es posible eliminar su registro.",
          "info"
        );

        return;
      }

      else if (atencionesAgendadas > 0) {

        swal.fire({
          title: 'Paciente en tratamiento!',
          text: 'El paciente tiene atenciones agendadas, pero no pagadas.\n¿Desea eliminar su registro?\nEsta acción eliminará sus horarios de atención futuros.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.isConfirmed) {
            this.realDelete();

            this.paciente.atenciones.forEach(atencion => {
              if (moment(atencion.fechaAtencion).isAfter(moment())) {
                this.horarioAtencionService.eliminarHorario(atencion.idAtencion).subscribe(atencionEliminada => console.log(atencionEliminada));
              }
            });
          }
        });

        return;
      }
    }

    swal.fire({
      title: '¿Eliminar paciente?',
      text: 'Si lo desea, podrá recuperar este registro accediendo al historial de pacientes.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.realDelete();
      }
    });
  }

  realDelete() {
    this.pacienteService.eliminarPaciente(this.paciente, this.paciente.idPaciente).subscribe(paciente => {

      swal.fire(
        'Paciente eliminado!',
        'El registro del paciente ha sido eliminado.',
        'success'
      );

      this.router.navigate(['pacientes/page/0']);
    });
  }

  // Para reintegrar un paciente a la consulta
  reintegrar() {
    swal.fire({
      title: '¿Reintegrar paciente?',
      text: '¿Desea volver a incorporar los registros del paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.pacienteService.reintegrarPaciente(this.paciente, this.paciente.idPaciente).subscribe(paciente => {
          swal.fire(
            "Paciente reintegrado!",
            "El paciente ha sido reincorporado al registro de pacientes que actualmente son atendidos en la consulta.",
            "success"
          );

          this.router.navigate(['/pacientes/page/0']);
        });
      }
    });
  }

  // Para volver a la página anterior
  back(): void {
    if (this.paciente.estado == 'Activo') this.router.navigate(['pacientes/page/0']);
    else this.router.navigate(['pacientes/historial/page/0']);
  }
}
