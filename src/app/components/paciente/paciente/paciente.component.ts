import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import swal from 'sweetalert2';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  // Obtiene la fecha actual, para calcular la edad
  today = moment();

  // Representa al paciente 
  paciente: Paciente = new Paciente();

  // Para desplegar la fecha de nacimiento
  birthday!: string;

  // Para desplegar la fecha de la anamnesis
  fechaAnamnesis!: string;

  constructor(private activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;

          if (this.paciente.fechaNacimiento != null)
            this.birthday = moment(this.paciente.fechaNacimiento).format("dddd Do MMMM YYYY");

          else this.birthday = "-";

          if (this.paciente.anamnesis != undefined) this.fechaAnamnesis = moment(this.paciente.anamnesis.fechaAnamnesis).format("dddd Do MMMM YYYY");
        });
      }
    });
  }

  // Para calcular la edad del paciente
  age(): any {
    if (this.paciente.fechaNacimiento != null)
      return Math.abs(moment(this.paciente.fechaNacimiento).diff(this.today, 'years'));

    else return "-";
  }

  // Permite la eliminación lógica de un paciente
  deletePatient() {
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
        this.pacienteService.eliminarPaciente(this.paciente, this.paciente.idPaciente).subscribe(res => {
          console.log(res);

          this.router.navigate(['pacientes/page/0']);

          swal.fire(
            'Paciente eliminado!',
            'El registro del paciente ha sido eliminado.',
            'success'
          );
        });
      }
    })
  }

  // Para volver a la página anterior
  back(): void {
    this.router.navigate(['pacientes/page/0']);
  }
}
