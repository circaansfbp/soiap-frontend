import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  // Pacientes buscados
  inactiveSearchedPatients: Paciente[] = new Array();

  // Paginador
  paginador!: any;

  paciente: Paciente = new Paciente();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService,
    public auth: AuthService) { }

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
  searchInactivePatients(nombre: string, apellido: string) {
    // Búsqueda por nombre
    if (nombre && apellido == "") {
      this.pacienteService.obtenerPacientesInactivosPorNombre(nombre).subscribe(res => {
        this.inactiveSearchedPatients = res as Paciente[];
      });
    }

    // Búsqueda por apellido
    else if (nombre == "" && apellido) {
      this.pacienteService.obtenerPacientesInactivosPorApellido(apellido).subscribe(res => {
        this.inactiveSearchedPatients = res as Paciente[];
      });
    }

    // Búsqueda por nombre y apellido
    else if (nombre && apellido) {
      this.pacienteService.obtenerPacientesInactivosPorNombreApellido(nombre, apellido).subscribe(res => {
        this.inactiveSearchedPatients = res as Paciente[];
      });
    }

    this.clearSearch();
  }

  // Para limpiar los parámetros de búsqueda
  clearSearch() {
    this.inactiveSearchedPatients = [];
  }

  // Para volver atrás
  back() {
    this.router.navigate(['pacientes/page/0']);
  }
}
