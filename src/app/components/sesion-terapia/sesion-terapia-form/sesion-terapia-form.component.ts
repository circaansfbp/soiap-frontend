import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Paciente } from 'src/app/classes/paciente/paciente';
import { SesionTerapia } from 'src/app/classes/sesion-terapia/sesion-terapia';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { SesionTerapiaService } from 'src/app/services/sesion-terapia/sesion-terapia.service';

import swal from 'sweetalert2';
import * as moment from 'moment';
import { Location } from '@angular/common';
moment.locale('es');

@Component({
  selector: 'app-sesion-terapia-form',
  templateUrl: './sesion-terapia-form.component.html',
  styleUrls: ['./sesion-terapia-form.component.css']
})
export class SesionTerapiaFormComponent implements OnInit {

  title!: string;
  subtitle!: string;
  fechaActual: string = moment().format("dddd Do MMMM YYYY");

  // Paciente asociado a las sesiones de terapia.
  paciente: Paciente = new Paciente();

  // Sesión de terapia a registrar
  sesion: SesionTerapia = new SesionTerapia();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private pacienteService: PacienteService,
    private sesionTerapiaService: SesionTerapiaService) { }

  ngOnInit(): void {
    this.title = "Nueva sesión de terapia."
    this.subtitle = "Ingrese las observaciones obtenidas a partir de la sesión."
    this.getAssociatedPatient();
  }

  // Para obtener al paciente asociado a la sesión de terapia que se desea crear o actualizar
  getAssociatedPatient() {
    this.activatedRoute.params.subscribe(param => {
      let idPaciente = param['idPaciente'];
      let idSesion = param['idSesion'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;
        });
      }

      // En caso de que se desee actualizar una sesión de terapia
      if (idSesion) {
        this.sesionTerapiaService.getSesion(idSesion).subscribe(sesionObtenida => {
          this.sesion = sesionObtenida;
          this.title = "Modificar sesión de terapia."
          this.subtitle = "Ingrese los cambios que estime necesarios."
        });
      }
    });
  }

  // Para crear una nueva sesión
  createSesion() {
    this.sesion.fichaTratamiento = this.paciente.fichaTratamiento;
    this.sesionTerapiaService.createSession(this.sesion).subscribe(sesionCreada => {
      console.log(sesionCreada);

      swal.fire(
        "Sesión registrada!",
        `La sesión de terapia con fecha ${this.fechaActual} ha sido creada exitosamente.`,
        "success"
      );

      this.router.navigate(['pacientes/ficha-tratamiento/sesiones', this.paciente.idPaciente]);
    });
  }

  // Para actualizar una sesión
  updateSesion() {
    swal.fire({
      title: 'Guardar cambios',
      text: '¿Desea guardar los cambios registrados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.sesionTerapiaService.updateSesion(this.sesion, this.sesion.idSesion).subscribe(sesionActualizada => {
          console.log(sesionActualizada);

          swal.fire(
            'Datos actualizados!',
            'Los datos de la sesión de terapia han sido actualizados exitosamente.',
            'success'
          );

          this.location.back();
        });
      }
    });
  }

  // Para volver atrás
  back(observaciones: string) {
    if (observaciones != undefined) {
      swal.fire({
        title: 'Cencelar operación',
        text: '¿Está seguro/a que desea cancelar el registro de la sesión de terapia? Los datos ingresados no serán guardados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro/a',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.location.back();
        }
      });
    }
    else this.location.back();
  }
}
