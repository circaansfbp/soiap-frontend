import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Paciente } from 'src/app/classes/paciente/paciente';
import { SesionTerapia } from 'src/app/classes/sesion-terapia/sesion-terapia';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import * as moment from 'moment';
import swal from 'sweetalert2';

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

          console.log(this.sesiones);

          this.sesiones.sort((firstDate, secondDate) => {
            return +new Date(secondDate.fechaSesion) - +new Date(firstDate.fechaSesion);
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

  // Búsqueda mediante input fecha
  searchBySpecificDate(date: string) {
    this.sesiones = this.sesiones.filter(sesion => moment(sesion.fechaSesion).isSame(moment(date)));

    if (this.sesiones.length == 0) {
      swal.fire(
        'No se encontraron sesiones!',
        'El paciente no registra sesiones de terapia en la fecha especificada.',
        'error'
      );
    }
  }

  // Para volver a mostrar todas las sesiones de terapia
  displayAll() {
    this.sesiones = this.paciente.fichaTratamiento.sesionesDeTerapia;
  }

  // Para volver atrás
  back() {
    this.router.navigate(['pacientes/', this.paciente.idPaciente]);
  }
}
