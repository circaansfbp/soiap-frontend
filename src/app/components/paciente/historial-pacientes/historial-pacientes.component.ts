import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-historial-pacientes',
  templateUrl: './historial-pacientes.component.html',
  styleUrls: ['./historial-pacientes.component.css']
})
export class HistorialPacientesComponent implements OnInit {

  // Pacientes inactivos
  pacientesInactivos: Paciente[] = new Array();

  // Paginador
  paginador!: any;

  paciente: Paciente = new Paciente();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.getInactivePatients();
  }

  // Para obtener todos los pacientes con estado "Inactivo"
  getInactivePatients() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) page = 0;

      this.pacienteService.obtenerPacientesInactivos(page).subscribe(res => {
        this.pacientesInactivos = res.content as Paciente[];
        this.paginador = res;
      })
    });
  }

  // Para buscar pacientes por nombre, apellido o ambos parámetros
  searchInactivePatients(values: any) {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) page = 0;

      // Búsqueda por nombre
      if (values.nombre && values.apellido == "") {
        this.pacienteService.obtenerPacientesInactivosPorNombre(values.nombre, page).subscribe(res => {
          this.pacientesInactivos = res.content as Paciente[];
          this.paginador = res;
        },
          error => {
            if (error.status == 404) {
              this.router.navigate(['pacientes/historial/page/0']);
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
        this.pacienteService.obtenerPacientesInactivosPorApellido(values.apellido, page).subscribe(res => {
          this.pacientesInactivos = res.content as Paciente[];
          this.paginador = res;
        },
          error => {
            if (error.status == 404) {
              this.router.navigate(['pacientes/historial/page/0']);
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
        this.pacienteService.obtenerPacientesInactivosPorNombreApellido(values.nombre, values.apellido, page).subscribe(res => {
          this.pacientesInactivos = res.content as Paciente[];
          this.paginador = res;
        },
          error => {
            if (error.status == 404) {
              this.router.navigate(['pacientes/historial/page/0']);
              swal.fire(
                "No encontrado!",
                "No se han encontrado pacientes con el nombre completo ingresado. Intente nuevamente.",
                "error"
              );
            }
          });
      }
    })
  }

  // Para volver atrás
  back() {
    this.router.navigate(['pacientes/page/0']);
  }
}
