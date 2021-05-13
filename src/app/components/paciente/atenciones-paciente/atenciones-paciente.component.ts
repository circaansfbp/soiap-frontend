import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-atenciones-paciente',
  templateUrl: './atenciones-paciente.component.html',
  styleUrls: ['./atenciones-paciente.component.css']
})
export class AtencionesPacienteComponent implements OnInit {

  // Para almacenar el paciente al que le corresponden las atenciones
  paciente: Paciente = new Paciente();

  // Para manejar las atenciones del paciente
  atenciones: HorarioAtencion[] = new Array();

  // Número total de registros
  total!: number;

  // Página actual
  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  // Obtiene el paciente al que se le consultan las atenciones agendadas
  getPatient() {
    this.activatedRoute.params.subscribe(param => {
      let idPaciente = param['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;
          this.atenciones = paciente.atenciones;

          // Setea el total de registros
          this.total = this.atenciones.length;
        });
      }
    })
  }

  // Le da formato a la fecha de la atención
  formatDisplayFechaAtencion(horarioAtencion: HorarioAtencion): string {
    return moment(horarioAtencion.fechaAtencion).format("dddd Do MMMM YYYY");
  }

  // En el caso de que se quiera realizar una filtración de la lista
  filtrar(value: number) {

  }

  // Para volver atrás
  back() {
    this.location.back();
  }

}
