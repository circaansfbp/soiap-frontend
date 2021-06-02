import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Paciente } from 'src/app/classes/paciente/paciente';
import { SesionTerapia } from 'src/app/classes/sesion-terapia/sesion-terapia';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import * as moment from 'moment';
import { SesionTerapiaService } from 'src/app/services/sesion-terapia/sesion-terapia.service';
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

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;
          this.numeroSesion();
        });
      }
    });
  }

  // Para buscar el horario de atención que corresponde a la sesión de terapia y asociar su número de sesión.
  numeroSesion() {
    this.paciente.atenciones.forEach(atencion => {
      if (atencion.fechaAtencion == moment().format("YYYY[-]MM[-]DD")) this.sesion.nroSesion = atencion.nroConsulta;
    });
  }

  // Para crear una nueva sesión
  createSesion() {
    this.sesion.fichaTratamiento = this.paciente.fichaTratamiento;
    console.log(this.sesion);
    this.sesionTerapiaService.createSession(this.sesion).subscribe(sesionCreada => console.log(sesionCreada));
  }

  // Para actualizar una sesión
  updateSesion() {

  }

  // Para volver atrás
  back(observaciones: string) {

  }
}
