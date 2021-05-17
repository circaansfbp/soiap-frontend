import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FichaTratamiento } from 'src/app/classes/ficha-tratamiento/ficha-tratamiento';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';

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

  constructor(private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) { }

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
        "La ficha de tratamiento del paciente ha sido registrada exitosamente",
        "success"
      );
    });
  }

  // Para actualizar la ficha de tratamiento
  updateFichaTratamiento() {

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
