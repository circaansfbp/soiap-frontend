import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  // Obtiene la fecha actual, para calcular la edad
  today: string = moment().format("YYYY[-]M[-]D");

  // Representa al paciente 
  paciente: Paciente = new Paciente();

  // Para almacenar su edad
  edadPaciente!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente =>
          this.paciente = paciente);
      }
    });
  }

  age() {
    
  }
}
