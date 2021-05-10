import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Anamnesis } from 'src/app/classes/anamnesis/anamnesis';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

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

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.getAssociatedPatient();
  }

  // Para obtener al paciente asociado a la anamnesis a crear
  getAssociatedPatient() {
    this.activatedRoute.params.subscribe(param => {
      let idPaciente = param['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;
        });
      }
    })
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
