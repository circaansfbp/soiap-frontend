import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FichaTratamiento } from 'src/app/classes/ficha-tratamiento/ficha-tratamiento';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';
import { FichaTratamientoService } from 'src/app/services/ficha-tratamiento/ficha-tratamiento.service';
import { DictadoService } from 'src/app/services/dictado/dictado.service';

@Component({
  selector: 'app-ficha-tratamiento-form',
  templateUrl: './ficha-tratamiento-form.component.html',
  styleUrls: ['./ficha-tratamiento-form.component.css']
})
export class FichaTratamientoFormComponent implements OnInit {

  // Paciente relacionado a la ficha de tratamiento
  paciente: Paciente = new Paciente();

  // Ficha de tratamient
  fichaTratamiento: FichaTratamiento = new FichaTratamiento();

  // Para saber si se está dictando
  recording: boolean = false;

  // Arreglo con constantes que permiten deshabilitar los botones de grabación
  disable: boolean[] = [false, false, false, false];

  constructor(private pacienteService: PacienteService,
    private fichaTratamientoService: FichaTratamientoService,
    private dictadoService: DictadoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) { this.dictadoService.init(); }

  ngOnInit(): void {
    this.getAssociatedPatient();
  }

  // Para obtener al paciente asociado a la ficha de tratamiento a crear o actualizar
  getAssociatedPatient() {
    this.activatedRoute.params.subscribe(param => {
      let idPaciente = param['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;

          // En caso de que se desee actualizar
          if (this.paciente.fichaTratamiento) this.fichaTratamiento = this.paciente.fichaTratamiento;
        });
      }
    });
  }

  // Para guardar la ficha de tratamiento
  createFichaTratamiento() {
    this.paciente.fichaTratamiento = this.fichaTratamiento;

    this.pacienteService.actualizarPaciente(this.paciente).subscribe(paciente => {
      this.paciente = paciente;
      console.log(this.paciente);

      this.router.navigate(['pacientes/', this.paciente.idPaciente]);

      swal.fire(
        "Ficha de tratamiento registrada!",
        "La ficha de tratamiento del paciente ha sido registrada exitosamente.",
        "success"
      );
    });
  }

  // Para actualizar la ficha de tratamiento
  updateFichaTratamiento() {
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
        this.fichaTratamientoService.updateFichaTratamiento(this.fichaTratamiento, this.fichaTratamiento.idFichaTratamiento)
          .subscribe(fichaTratamiento => {
          this.fichaTratamiento = fichaTratamiento;

          this.router.navigate(['pacientes/', this.paciente.idPaciente]);

          swal.fire(
            'Datos actualizados!',
            'Los datos de la ficha de tratamiento del paciente han sido actualizados exitosamente.',
            'success'
          );

          console.log(this.fichaTratamiento);
        });
      }
    });
  }

  // Para iniciar el dictado por voz
  record(whichInput: number) {
    swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Grabación iniciada!',
      text: 'Ya puede comenzar a dictar la información. Una vez finalizado, presione el mismo botón para detener la grabación.',
      showConfirmButton: true,
      confirmButtonText: 'OK!',
      timer: 4000
    });

    if (whichInput == 1) {
      this.disable = [false, true, true, true];
    }

    else if (whichInput == 2) {
      this.disable = [true, false, true, true];
    }

    else if (whichInput == 3) {
      this.disable = [true, true, false, true];
    }

    else if (whichInput == 4) {
      this.disable = [true, true, true, false];
    }

    this.recording = true;
    this.dictadoService.start();
  }

  // Para detener el dictado por voz
  stopRecording(whichInput: number) {
    this.recording = false;

    // Para saber a cuál input del formulario corresponde 
    if (whichInput == 1) {
      if (this.fichaTratamiento.motivoConsultaProfesional == undefined) this.fichaTratamiento.motivoConsultaProfesional = '';
      this.fichaTratamiento.motivoConsultaProfesional = this.fichaTratamiento.motivoConsultaProfesional + " " + this.dictadoService.stop();
      
      // Para eliminar el espacio en blanco si es que existe.
      if (this.fichaTratamiento.motivoConsultaProfesional[0] == ' ') {
        this.fichaTratamiento.motivoConsultaProfesional = this.fichaTratamiento.motivoConsultaProfesional.slice(1, this.fichaTratamiento.motivoConsultaProfesional.length);
      }
    }

    else if (whichInput == 2) {
      if (this.fichaTratamiento.resultadoDiagnostico == undefined) this.fichaTratamiento.resultadoDiagnostico = '';
      this.fichaTratamiento.resultadoDiagnostico = this.fichaTratamiento.resultadoDiagnostico + " " + this.dictadoService.stop();

      // Para eliminar el espacio en blanco, si es que existe.
      if (this.fichaTratamiento.resultadoDiagnostico[0] == ' ') {
        this.fichaTratamiento.resultadoDiagnostico = this.fichaTratamiento.resultadoDiagnostico.slice(1, this.fichaTratamiento.resultadoDiagnostico.length);
      }
    }

    else if (whichInput == 3) {
      if (this.fichaTratamiento.sugerenciaTratamiento == undefined) this.fichaTratamiento.sugerenciaTratamiento = '';
      this.fichaTratamiento.sugerenciaTratamiento = this.fichaTratamiento.sugerenciaTratamiento + " " + this.dictadoService.stop();

      // Para eliminar el espacio en blanco, si es que existe
      if (this.fichaTratamiento.sugerenciaTratamiento[0] == ' ') {
        this.fichaTratamiento.sugerenciaTratamiento = this.fichaTratamiento.sugerenciaTratamiento.slice(1, this.fichaTratamiento.sugerenciaTratamiento.length);
      }
    }

    else if (whichInput == 4) {
      if (this.fichaTratamiento.objetivosTerapia == undefined) this.fichaTratamiento.objetivosTerapia = '';
      this.fichaTratamiento.objetivosTerapia = this.fichaTratamiento.objetivosTerapia + " " + this.dictadoService.stop();

      // Para eliminar el espacio en blanco, si es que existe
      if (this.fichaTratamiento.objetivosTerapia[0] == ' ') {
        this.fichaTratamiento.objetivosTerapia = this.fichaTratamiento.objetivosTerapia.slice(1, this.fichaTratamiento.objetivosTerapia.length);
      }
    }
  }


  // Para volver atrás/cancelar la operación
  back(motivoConsulta: string, resultadoDiagnostico: string, sugerenciaTratamiento: string, objetivosTerapia: string): void {
    if (motivoConsulta != undefined || resultadoDiagnostico != undefined || sugerenciaTratamiento != undefined || objetivosTerapia != undefined) {
      swal.fire({
        title: 'Cencelar operación',
        text: '¿Está seguro/a que desea cancelar el registro de la ficha de tratamiento? Los datos ingresados no serán guardados.',
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
    } else this.location.back();
  }
}
