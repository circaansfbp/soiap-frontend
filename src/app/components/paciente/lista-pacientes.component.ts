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

  pacientes!: Paciente[];
  paginador!: any;

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
    console.log(paciente.atenciones);
  }

  // Permite la búsqueda de pacientes mediante su nombre; los retorna paginados.
  getPatientsByName(name: string) {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('params')!;

      if (!page) page = 0;

      this.pacienteService.obtenerPacientesPorNombre(name, page).subscribe(res => {
        this.pacientes = res.content as Paciente[];
        this.paginador = res;

        console.log(this.paginador);
        console.log(this.pacientes);
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
    });
  }

  // Permite la eliminación lógica de un paciente
  deletePatient(paciente: Paciente) {
    swal.fire({
      title: '¿Eliminar paciente?',
      text: 'Esta acción es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(paciente, paciente.idPaciente).subscribe(res => {
          console.log(res);

          // Para refrescar componente
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });

          swal.fire(
            'Paciente eliminado!',
            'El registro del paciente ha sido eliminado.',
            'success'
          );
        });
      }
    })
  }
}

