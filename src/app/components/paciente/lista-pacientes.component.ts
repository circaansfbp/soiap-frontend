import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  // Título y subtítulo de la vista
  title!: string;
  subtitle!: string;

  // Lista de los pacientes
  pacientes!: Paciente[];

  // Pacientes buscados
  searchedPatients: Paciente[] = new Array();

  // Paginador
  paginador!: any;

  // Al seleccionarse un paciente específico
  paciente: Paciente = new Paciente();

  constructor(private pacienteService: PacienteService,
    public auth: AuthService,
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

        // Al iniciarse el componente, siempre se mostrarán los pacientes activos.
        this.title = "Pacientes";
        this.subtitle = "Los siguientes pacientes se atienden, actualmente, en la consulta."
      });
    });
  }

  // Permite la búsqueda de pacientes mediante su nombre, apellido o ambos.
  getPatients(nombre: string, apellido: string) {
    // Búsqueda por nombre
    if (nombre && apellido == "") {
      this.pacienteService.obtenerPacientesPorNombreSinPaginar(nombre).subscribe(res => {
        this.searchedPatients = res as Paciente[];
      });
    }

    // Búsqueda por apellido
    else if (nombre == "" && apellido) {
      this.pacienteService.obtenerPacientesPorApellidoSinPaginar(apellido).subscribe(res => {
        this.searchedPatients = res as Paciente[];
      });
    }

    // Búsqueda por nombre y apellido
    else if (nombre && apellido) {
      this.pacienteService.obtenerPacientesPorNombreApellidoSinPaginar(nombre, apellido).subscribe(res => {
        this.searchedPatients = res as Paciente[];
      });
    }

    this.clearSearch();
  }

  // Para limpiar la búsqueda de pacientes
  clearSearch() {
    this.searchedPatients = [];
  }

  // Para retornar a la agenda
  back() {
    this.router.navigate(['']);
  }
}

