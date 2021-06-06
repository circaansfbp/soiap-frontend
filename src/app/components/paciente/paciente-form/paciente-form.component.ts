import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { DictadoService } from 'src/app/services/dictado/dictado.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

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
        });
      }
    })
  }

  updatePaciente() {
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
          this.pacienteService.actualizarPaciente(this.paciente).subscribe(res => {
            this.router.navigate(['pacientes/page/0']);

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
    swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Grabación iniciada!',
      text: 'Ya puede comenzar a dictar la información. Una vez finalizado, presione el mismo botón para detener la grabación.',
      showConfirmButton: true,
      confirmButtonText: 'OK!',
      timer: 4000
    });

    this.recording = true;
    this.dictadoService.start();
  }

  // Para detener el dictado por voz
  stopRecording() {
    this.recording = false;
    this.paciente.familiaNuclear = this.paciente.familiaNuclear + " " + this.dictadoService.stop();
  }

  // Para volver a la página anterior
  back(nombrePaciente: string, apellidoPaciente: string, telefonoPaciente: string, fechaNacimientoPaciente: string,
    ocupacionPaciente: string, institucionPaciente: string, afiliacionSaludPaciente: string, estadoCivilPaciente: string,
    familiaNuclearPaciente: string): void {

    if (nombrePaciente != undefined || apellidoPaciente != undefined || telefonoPaciente != undefined ||
      fechaNacimientoPaciente != undefined || ocupacionPaciente != undefined || institucionPaciente != undefined ||
      afiliacionSaludPaciente != undefined || estadoCivilPaciente != undefined || familiaNuclearPaciente != undefined) {

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
