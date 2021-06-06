import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Anamnesis } from 'src/app/classes/anamnesis/anamnesis';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { AnamnesisService } from 'src/app/services/anamnesis/anamnesis.service';
import { DictadoService } from 'src/app/services/dictado/dictado.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-anamnesis-form',
  templateUrl: './anamnesis-form.component.html',
  styleUrls: ['./anamnesis-form.component.css']
})
export class AnamnesisFormComponent implements OnInit {

  // Para almacenar el paciente
  paciente: Paciente = new Paciente();

  // Para almacenar la anamnesis del paciente
  anamnesis: Anamnesis = new Anamnesis();

  // Para manejar el dictado por voz
  recording: boolean = false;

  // Arreglo con constantes que permiten deshabilitar los botones de grabación
  disable: boolean[] = [false, false, false, false];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private pacienteService: PacienteService,
    private anamnesisService: AnamnesisService,
    private dictadoService: DictadoService) { this.dictadoService.init(); }

  ngOnInit(): void {
    this.getAssociatedPatient();
  }

  // Para obtener al paciente asociado a la anamnesis a crear o actualizar
  getAssociatedPatient() {
    this.activatedRoute.params.subscribe(param => {
      let idPaciente = param['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;

          if (this.paciente.anamnesis) this.anamnesis = this.paciente.anamnesis;
        });
      }
    })
  }

  // Guardar la anamnesis de un paciente
  createAnamnesis() {
    if (this.anamnesis.observaciones == undefined) this.anamnesis.observaciones = "-";
    this.paciente.anamnesis = this.anamnesis;

    this.pacienteService.actualizarPaciente(this.paciente).subscribe(paciente => {
      this.paciente = paciente;
      console.log(this.paciente);

      this.router.navigate(['pacientes/', paciente.idPaciente]);

      swal.fire(
        "Anamnesis registrada!",
        "La anamnesis del paciente ha sido registrada exitosamente",
        "success"
      );
    });
  }

  // Actualizar la anamnesis de un paciente
  updateAnamnesis() {
    if (this.anamnesis.observaciones == "") this.anamnesis.observaciones = "-";

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
        this.anamnesisService.updateAnamnesis(this.anamnesis, this.anamnesis.idAnamnesis).subscribe(anamnesis => {
          this.anamnesis = anamnesis;

          this.router.navigate(['pacientes/', this.paciente.idPaciente]);

          swal.fire(
            'Datos actualizados!',
            'Los datos de la anamnesis del paciente han sido actualizados exitosamente.',
            'success'
          );

          console.log(anamnesis);
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
      if (this.anamnesis.motivoConsultaPaciente == undefined) this.anamnesis.motivoConsultaPaciente = '';
      this.anamnesis.motivoConsultaPaciente = this.anamnesis.motivoConsultaPaciente + " " + this.dictadoService.stop();
      
      // Para eliminar el espacio en blanco si es que existe.
      if (this.anamnesis.motivoConsultaPaciente[0] == ' ') {
        this.anamnesis.motivoConsultaPaciente = this.anamnesis.motivoConsultaPaciente.slice(1, this.anamnesis.motivoConsultaPaciente.length);
      }
    }

    else if (whichInput == 2) {
      if (this.anamnesis.antecedentesPaciente == undefined) this.anamnesis.antecedentesPaciente = '';
      this.anamnesis.antecedentesPaciente = this.anamnesis.antecedentesPaciente + " " + this.dictadoService.stop();

      // Para eliminar el espacio en blanco, si es que existe.
      if (this.anamnesis.antecedentesPaciente[0] == ' ') {
        this.anamnesis.antecedentesPaciente = this.anamnesis.antecedentesPaciente.slice(1, this.anamnesis.antecedentesPaciente.length);
      }
    }

    else if (whichInput == 3) {
      if (this.anamnesis.antecedentesFamiliares == undefined) this.anamnesis.antecedentesFamiliares = '';
      this.anamnesis.antecedentesFamiliares = this.anamnesis.antecedentesFamiliares + " " + this.dictadoService.stop();

      // Para eliminar el espacio en blanco, si es que existe
      if (this.anamnesis.antecedentesFamiliares[0] == ' ') {
        this.anamnesis.antecedentesFamiliares = this.anamnesis.antecedentesFamiliares.slice(1, this.anamnesis.antecedentesFamiliares.length);
      }
    }

    else if (whichInput == 4) {
      if (this.anamnesis.observaciones == undefined) this.anamnesis.observaciones = '';
      this.anamnesis.observaciones = this.anamnesis.observaciones + " " + this.dictadoService.stop();

      // Para eliminar el espacio en blanco, si es que existe
      if (this.anamnesis.observaciones[0] == ' ') {
        this.anamnesis.observaciones = this.anamnesis.observaciones.slice(1, this.anamnesis.observaciones.length);
      }
    }
  }

  // Para volver atrás/cancelar la operación
  back(motivoConsulta: string, antecedentesPaciente: string, antecedentesFamiliares: string, observaciones: string): void {
    if (motivoConsulta != undefined || antecedentesPaciente != undefined || antecedentesFamiliares != undefined || observaciones != undefined) {
      swal.fire({
        title: 'Cencelar operación',
        text: '¿Está seguro/a que desea cancelar el registro de la anamnesis? Los datos ingresados no serán guardados.',
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
