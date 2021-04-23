import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  title: string = "Modificar datos";
  subtitle: string = "A continuación, puede realizar los cambios necesarios:";

  paciente: Paciente = new Paciente();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.loadPatientData();
  }

  // Para cargar los datos de un paciente en el formulario, cuando se quiera modificar sus datos. 
  loadPatientData() {
    this.activatedRoute.params.subscribe(params => {
      let idPaciente = params['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          paciente.telefono = paciente.telefono.slice(4, 12);
          this.paciente = paciente;
        });
      }
    })
  }

  updatePaciente() {
    swal.fire({
      title: '¿Guardar cambios?',
      text: '¿Estás seguro/a de que deseas guardar los cambios ingresados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.paciente) {
          this.pacienteService.actualizarPaciente(this.paciente).subscribe(res => {
            this.router.navigate(['pacientes/page/0']);

            swal.fire(
              'Datos actualizados!',
              'La información ha sido actualizada exitosamente.',
              'success'
            );
          });
        }
      }
    })
  }

}
