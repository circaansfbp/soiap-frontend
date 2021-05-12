import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Anamnesis } from 'src/app/classes/anamnesis/anamnesis';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';
import { AnamnesisService } from 'src/app/services/anamnesis/anamnesis.service';

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

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private pacienteService: PacienteService,
    private anamnesisService: AnamnesisService) { }

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
      )
    })
  }

  // Actualizar la anamnesis de un paciente
  uodateAnamnesis() {
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
