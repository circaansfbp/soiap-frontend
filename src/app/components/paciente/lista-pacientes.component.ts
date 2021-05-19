import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  // Título y subtítulo de la vista
  title!: string;
  subtitle!: string;

  // Opciones a entregar al filtro de pacientes
  options: any[] = [
    { value: '', text: 'Filtrar...' },
    { value: 1, text: 'Pacientes activos' },
    { value: -1, text: 'Pacientes inactivos' },
    { value: 0, text: 'Ver historial completo de pacientes' }
  ]

  // Lista de los pacientes
  pacientes!: Paciente[];

  // Paginador
  paginador!: any;

  // Al seleccionarse un paciente específico
  paciente: Paciente = new Paciente();

  constructor(private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  // Al iniciar el ciclo de vida, se obtienen todos los pacientes, paginados.
  ngOnInit(): void {
    this.init();

    // Al iniciarse el componente, siempre se mostrarán los pacientes activos.
    this.title = "Pacientes activos";
    this.subtitle = "Pacientes que, actualmente, se atienden en la consulta."
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

  // Filtro de pacientes
  filter(value: number) {
    if (value == 1) {
      this.init();
    }
  }

  // Permite la búsqueda de pacientes mediante su nombre, apellido o ambos; los retorna paginados.
  getPatients(values: any) {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('params')!;

      if (!page) page = 0;

      // Búsqueda por nombre
      if (values.nombre && values.apellido == "") {
        this.pacienteService.searchAllPatientsByName(values.nombre, page).subscribe(res => {
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
        this.pacienteService.searchAllPatientsByLastname(values.apellido, page).subscribe(res => {
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
        this.pacienteService.searchAllPatientsByNameAndLastname(values.nombre, values.apellido, page).subscribe(res => {
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

  // Para retornar a la agenda
  back() {
    this.router.navigate(['']);
  }
}

