import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { DictadoService } from 'src/app/services/dictado/dictado.service';

import * as moment from 'moment';
moment.locale("es");

import swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  // Para verificar que la fecha de nacimiento seleccionada no sea una futura
  fechaActual: string = moment().format("YYYY[-]MM[-]DD");

  title: string = "Modificar datos";
  subtitle: string = "A continuación, puede realizar los cambios necesarios:";

  // Para manejar al paciente
  paciente: Paciente = new Paciente();

  // Para verificar si se está dictando o no
  recording: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private pacienteService: PacienteService,
    private dictadoService: DictadoService) { this.dictadoService.init(); }

  ngOnInit(): void {
    this.loadPatientData();
  }

  // Para cargar los datos de un paciente en el formulario, cuando se quiera modificar sus datos. 
  loadPatientData() {
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          paciente.telefono = paciente.telefono.slice(4, 12);
          this.paciente = paciente;

          console.log(paciente);
        });
      }
    })
  }

  updatePaciente() {
    if (!this.paciente.familiaNuclear.trim()) {
      swal.fire(
        'Dato inválido!',
        'El campo que corresponde a la familia nuclear del paciente no puede quedar vacío.',
        'error'
      );

      return;
    }

    swal.fire({
      title: '¿Guardar cambios?',
      text: '¿Estás seguro/a de que deseas guardar los cambios ingresados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.paciente) {
          this.pacienteService.actualizarPaciente(this.paciente).subscribe(pacienteActualizado => {
            this.paciente = pacienteActualizado;
            this.router.navigate(['pacientes/', this.paciente.idPaciente]);

            swal.fire(
              'Datos actualizados!',
              'La información ha sido actualizada exitosamente.',
              'success'
            );
          });
        }
      }
    })
  }

  // Para iniciar dictado por voz
  record() {
    this.recording = true;
    this.dictadoService.start();
  }

  // Para detener el dictado por voz
  stopRecording() {
    this.recording = false;

    this.paciente.familiaNuclear = this.paciente.familiaNuclear + " " + this.dictadoService.stop();

    // Para eliminar el posible espacio en blanco que se genera
    if (this.paciente.familiaNuclear[0] == " ") {
      this.paciente.familiaNuclear = this.paciente.familiaNuclear.slice(1, this.paciente.familiaNuclear.length);
    }
  }

  // Para volver a la página anterior
  back(nombrePaciente: string, apellidoPaciente: string, telefonoPaciente: string, fechaNacimientoPaciente: string,
    ocupacionPaciente: string, institucionPaciente: string, afiliacionSaludPaciente: string, estadoCivilPaciente: string,
    familiaNuclearPaciente: string, emailPaciente: string): void {

    if (nombrePaciente != undefined || apellidoPaciente != undefined || telefonoPaciente != undefined ||
      fechaNacimientoPaciente != undefined || ocupacionPaciente != undefined || institucionPaciente != undefined ||
      afiliacionSaludPaciente != undefined || estadoCivilPaciente != undefined || familiaNuclearPaciente != undefined
      || emailPaciente != undefined) {

      swal.fire({
        title: 'Cencelar operación',
        text: '¿Está seguro/a que desea cancelar el registro de los datos del paciente? Los datos ingresados no serán guardados.',
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
      })
    }
    else this.location.back();
  }
}
