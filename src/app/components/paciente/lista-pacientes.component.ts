import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import * as moment from 'moment';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';

@Component({
  selector: 'app-paciente',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  pacientes!: Paciente[];
  paginador!: any;
  paciente: Paciente = new Paciente();

  // Para manejar las atenciones a las que ha asistido un paciente 
  atencionesUltimosSeisMeses: HorarioAtencion[] = new Array();

  // Para manejar las atenciones filtradas
  atencionesFiltradas: HorarioAtencion[] = new Array();

  // Fecha actual (para calcular rango de atenciones desde-hasta seis meses atrás)
  // Agrega un día para permitir inclusión de atenciones agendadas para el día actual
  fechaActual: string = moment().add(1, 'days').format("YYYY[-]MM[-]DD");

  constructor(private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  // Al iniciar el ciclo de vida, se obtienen todos los pacientes, paginados.
  ngOnInit(): void {
    this.init();
  }

  // Obtiene todos los pacientes con estado 'Activo'
  init() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) page = 0;

      this.pacienteService.obtenerPacientes(page).subscribe(res => {
        this.pacientes = res.content as Paciente[];
        this.paginador = res;
      });

      console.log(this.pacientes);
    });
  }

  // Obtener las atenciones de un paciente
  getAtencionesDeUnPaciente(paciente: Paciente) {
    this.atencionesUltimosSeisMeses = [];

    this.paciente = paciente;
    this.fechaActual = moment().add(1, 'days').format("YYYY[-]MM[-]DD");
    let sixMonthsBefore = moment(this.fechaActual).subtract(6, 'months').format("YYYY[-]MM[-]DD");

    // Agrega las atenciones agendadas en los últimos seis meses
    this.paciente.atenciones.forEach(atencion => {
      if (moment(atencion.fechaAtencion).isBetween(sixMonthsBefore, this.fechaActual)) {
        this.atencionesUltimosSeisMeses.push(atencion);
      }
    });

    console.log(this.atencionesUltimosSeisMeses);
  }

  // Regresar seis meses
  backSixMonths() {
    this.atencionesUltimosSeisMeses = [];

    this.fechaActual = moment(this.fechaActual).subtract(6, 'months').format("YYYY[-]MM[-]DD");
    let sixMonthsBefore = moment(this.fechaActual).subtract(6, 'months').format("YYYY[-]MM[-]DD");

    this.paciente.atenciones.forEach(atencion => {
      if (moment(atencion.fechaAtencion).isBetween(sixMonthsBefore, this.fechaActual)) {
        this.atencionesUltimosSeisMeses.push(atencion);
      }
    });

    console.log("RETROCEDE SEIS MESES");
    console.log(this.fechaActual);
    console.log(sixMonthsBefore);
  }

  // Avanzar seis meses (Debiese controlar el avance de seis meses?)
  forwardSixMonths() {
    this.atencionesUltimosSeisMeses = [];

    let sixMonthsForward = moment(this.fechaActual).add(6, 'months').format("YYYY[-]MM[-]DD");
    console.log(this.fechaActual);
    
    this.paciente.atenciones.forEach(atencion => {
      if (moment(atencion.fechaAtencion).isBetween(this.fechaActual, sixMonthsForward)) {
        this.atencionesUltimosSeisMeses.push(atencion);
      }
    });

    this.fechaActual = sixMonthsForward;

    console.log("AVANZA SEIS MESES");
    console.log(this.fechaActual);
    console.log(sixMonthsForward);
  }

  // Para desplegar la fecha de la atención formateada
  formatDisplayFechaAtencion(horarioAtencion: HorarioAtencion): string {
    return moment(horarioAtencion.fechaAtencion).format("dddd Do MMMM YYYY");
  }

  // Permite filtrar las atenciones de un paciente por asistidas y no asistidas
  filterPatients(asistencia: number): HorarioAtencion[] {
    this.atencionesUltimosSeisMeses = this.paciente.atenciones;
    let filtered: HorarioAtencion[] = new Array();

    this.atencionesUltimosSeisMeses.filter(atencion => {
      if (atencion.asistencia == asistencia) filtered.push(atencion);
    });

    this.atencionesUltimosSeisMeses = [];

    return filtered;
  }

  // Llama a la función que filtra las atenciones y actualiza la lista
  actualizarAtencionesFiltradas(asistencia: number) {

    this.atencionesFiltradas = this.paciente.atenciones;
    this.atencionesFiltradas = this.filterPatients(asistencia);

    console.log(this.atencionesFiltradas);

    this.fechaActual = moment().add(1, 'days').format("YYYY[-]MM[-]DD");
    let sixMonthsBefore = moment(this.fechaActual).subtract(6, 'months').format("YYYY[-]MM[-]DD");

    this.atencionesFiltradas.forEach(atencion => {
      if (moment(atencion.fechaAtencion).isBetween(sixMonthsBefore, this.fechaActual)) {
        this.atencionesUltimosSeisMeses.push(atencion);
      }
    });

    console.log(this.atencionesUltimosSeisMeses);
  }

  // Permite la búsqueda de pacientes mediante su nombre, apellido o ambos; los retorna paginados.
  getPatients(values: any) {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('params')!;

      if (!page) page = 0;

      // Búsqueda por nombre
      if (values.nombre && values.apellido == "") {
        this.pacienteService.obtenerPacientesPorNombre(values.nombre, page).subscribe(res => {
          this.pacientes = res.content as Paciente[];
          this.paginador = res;
        },
          error => {
            if (error.status == 404) {
              this.router.navigate(['pacientes/page/0']);
              swal.fire(
                "No encontrado!",
                "No se han encontrado pacientes con el nombre ingresado. Intente nuevamente.",
                "error"
              );
            }
          });
      }

      // Búsqueda por apellido
      else if (values.nombre == "" && values.apellido) {
        this.pacienteService.obtenerPacientesPorApellido(values.apellido, page).subscribe(res => {
          this.pacientes = res.content as Paciente[];
          this.paginador = res;
        },
          error => {
            if (error.status == 404) {
              this.router.navigate(['pacientes/page/0']);
              swal.fire(
                "No encontrado!",
                "No se han encontrado pacientes con el apellido ingresado. Intente nuevamente.",
                "error"
              );
            }
          });
      }

      // Búsqueda por nombre y apellido
      else if (values.nombre && values.apellido) {
        this.pacienteService.obtenerPacientesPorNombreApellido(values.nombre, values.apellido, page).subscribe(res => {
          this.pacientes = res.content as Paciente[];
          this.paginador = res;
        },
          error => {
            if (error.status == 404) {
              this.router.navigate(['pacientes/page/0']);
              swal.fire(
                "No encontrado!",
                "No se han encontrado pacientes con el nombre completo ingresado. Intente nuevamente.",
                "error"
              );
            }
          });
      }
    });
  }

  // Permite la eliminación lógica de un paciente
  // deletePatient(paciente: Paciente) {
  //   swal.fire({
  //     title: '¿Eliminar paciente?',
  //     text: 'Esta acción es irreversible!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.pacienteService.eliminarPaciente(paciente, paciente.idPaciente).subscribe(res => {
  //         console.log(res);

  //         // Para refrescar componente
  //         let currentUrl = this.router.url;
  //         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //           this.router.navigate([currentUrl]);
  //         });

  //         swal.fire(
  //           'Paciente eliminado!',
  //           'El registro del paciente ha sido eliminado.',
  //           'success'
  //         );
  //       });
  //     }
  //   })
  // }
}

