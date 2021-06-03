import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { SesionTerapia } from 'src/app/classes/sesion-terapia/sesion-terapia';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-lista-sesiones',
  templateUrl: './lista-sesiones.component.html',
  styleUrls: ['./lista-sesiones.component.css']
})
export class ListaSesionesComponent implements OnInit {

  // Paciente asociado a las sesiones de terapia
  paciente: Paciente = new Paciente();

  // Para manejar las sesiones de terapia
  sesiones: SesionTerapia[] = new Array();

  // Para manejar el despliegue de las observaciones de una sesión de terapia específica
  sesion: SesionTerapia = new SesionTerapia();

  // Número total de sesiones de terapia
  totalSesiones!: number;

  // Página actual
  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.getAssociatedPatient();
  }

  // Obtener paciente asociado a las sesiones de terapia
  getAssociatedPatient() {
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente'];

      if (idPaciente)
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;
          this.sesiones = paciente.fichaTratamiento.sesionesDeTerapia;

          this.sesiones.sort((firstDate, secondDate) => {
            return +new Date(firstDate.fechaSesion) - +new Date(secondDate.fechaSesion);
          });

          this.totalSesiones = this.paciente.fichaTratamiento.sesionesDeTerapia.length;
        });
    });
  }

  // Para formatear la fecha de la sesión
  formatDisplayFechaSesion(sesion: SesionTerapia) {
    return moment(sesion.fechaSesion).format("dddd Do MMMM YYYY");
  }

  // Para setear el objeto 'sesion' con una sesion de terapia especifica
  setSesion(sesionEspecifica: SesionTerapia) {
    this.sesion = sesionEspecifica;
  }

  // Para volver atrás
  back() {
    this.router.navigate(['pacientes/', this.paciente.idPaciente]);
  }
}
