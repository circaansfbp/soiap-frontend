import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes!: Paciente[];
  paginador!: any;

  constructor(private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
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

  getPatientsByName(name: string) {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('params')!;

      if (!page) page = 0;

      this.pacienteService.obtenerPacientesPorNombre(name, page).subscribe(res => {
        this.pacientes = res.content as Paciente[];
        this.paginador = res;
      },
        error => {
          if (error.status == 404) {
            this.router.navigate(['pacientes']);
            swal.fire(
              "No encontrado!",
              "No se han encontrado pacientes con el nombre ingresado. Intente nuevamente.",
              "error"
            );
          }
        });
    });
  }
}

