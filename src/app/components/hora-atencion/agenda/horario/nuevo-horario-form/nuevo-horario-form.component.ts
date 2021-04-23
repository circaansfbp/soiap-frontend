import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-horario-form',
  templateUrl: './nuevo-horario-form.component.html',
  styleUrls: ['./nuevo-horario-form.component.css']
})
export class NuevoHorarioFormComponent implements OnInit {

  // Para guardar/actualizar una atención
  horarioAtencion: HorarioAtencion = new HorarioAtencion();

  // Para guardar/actualizar un paciente
  paciente!: Paciente;

  pacientes!: Paciente[];

  idAtencion!: number;
  idPaciente!: number;

  constructor(private horarioAtencionService: HorarioAtencionService,
    private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadHorarioAtencionData();
  }

  // Guardar los datos
  guardarNuevoHorario() {
    this.paciente.fechaNacimiento = new Date();
    this.paciente.estadoCivil = "";
    this.paciente.familiaNuclear = "";
    this.paciente.institucion = "";
    this.paciente.ocupacion = "";

    this.horarioAtencion.paciente = this.paciente;

    this.horarioAtencionService.crearNuevoHorarioAtencion(this.horarioAtencion).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['']);
      swal.fire('Horario creado!', 'La hora de atención ha sido guardada exitosamente.', 'success');
    });
  }

  // Cargar datos de un horario específico para permitir su actualización
  loadHorarioAtencionData() {
    this.activatedRoute.params.subscribe(params => {
      let idAtencion: number = params['idAtencion'];
      if (idAtencion) {
        this.horarioAtencionService.obtenerHorario(idAtencion).subscribe(
          (horario) => {
            this.horarioAtencion = horario;

            horario.paciente.telefono = horario.paciente.telefono.slice(4, 12);
            this.paciente = horario.paciente;

            console.log(horario);
          }
        );
      }
    });
  }

  // Actualizar un horario de atención  
  updateHorarioAtencion() {
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
        this.horarioAtencionService.modificarHorario(this.horarioAtencion).subscribe(horario => {
          this.pacienteService.actualizarPaciente(this.paciente).subscribe(paciente => {
            console.log(horario);
            console.log(paciente);
            this.router.navigate(['']);

            swal.fire(
              'Datos actualizados!',
              'La información ha sido actualizada exitosamente.',
              'success'
            );
          })
        });
      }
    });
  }

  // Carga los datos de un paciente
  loadPatientData(idPaciente: number) {
    this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
      this.paciente = paciente;

      swal.fire("Paciente seleccionado!", "Ahora puede proceder a agendar la hora de atención para " + paciente.nombre + " " + paciente.apellido, "success");
    });
  }

  // Buscar paciente para cargar sus datos en el formulario 
  searchPatients(nombrePaciente: string) {
    this.pacienteService.obtenerPacientesPorNombreSinPaginar(nombrePaciente).subscribe(res => {
      this.pacientes = res as Paciente[];
      console.log(this.pacientes);
    }, error => {
      if (error.status == 404) {
        swal.fire(
          "No encontrado!",
          "No se han encontrado pacientes con el nombre ingresado. Intente nuevamente.",
          "error"
        );
      }
    });
  }
}
