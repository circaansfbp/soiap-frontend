import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-paciente',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  pacientes!: Paciente[];
  paginador!: any;
  paciente: Paciente = new Paciente();

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

  // Para retornar a la agenda
  back() {
    this.router.navigate(['']);
  }
}

