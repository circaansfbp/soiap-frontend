import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import * as moment from 'moment';
import swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo-horario-form',
  templateUrl: './nuevo-horario-form.component.html',
  styleUrls: ['./nuevo-horario-form.component.css']
})
export class NuevoHorarioFormComponent implements OnInit {
  // Para validar que la fecha seleccionada no sea anterior a la fecha actual
  fechaActual: string = moment().format("YYYY[-]MM[-]DD");

  // Para guardar/actualizar una atención
  horarioAtencion: HorarioAtencion = new HorarioAtencion();

  // Para guardar/actualizar un paciente
  paciente!: Paciente;

  // Para guardar los pacientes encontrados al realizar su búsqueda
  pacientes!: Paciente[];

  // Para saber si el paciente es uno permanente o nuevo.
  pacientePermanente!: boolean;

  // Atributos del paciente
  nombre!: string;
  apellido!: string;
  nroTelefono!: string;
  afiliacion!: string;

  idAtencion!: number;
  idPaciente!: number;

  // Para saber si se quiere modificar un paciente
  modify: boolean = false;

  constructor(private horarioAtencionService: HorarioAtencionService,
    private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadHorarioAtencionData();
  }

  // Modificar paciente
  modifyPatient() {
    this.modify = true;
  }

  // Crear un nuevo horario de atención
  guardarNuevoHorario() {
    this.horarioAtencion.paciente = this.paciente;
    console.log(this.horarioAtencion.fechaAtencion);

    this.horarioAtencionService.crearNuevoHorarioAtencion(this.horarioAtencion).subscribe(horario => {
      console.log(horario);
      this.router.navigate(['']);
      swal.fire('Horario creado!', 'La hora de atención ha sido guardada exitosamente.', 'success');
    },
      error => {
        if (error.status == 409) {
          swal.fire(
            'Conflicto de horarios!',
            'La fecha y hora de atención seleccionados ya se encuentran asignados a otro paciente. Por favor, intente nuevamente con una fecha u hora distinta.',
            'error'
          );
        }
        else if (error.status == 204) {
          swal.fire(
            'Fallo en el ingreso de datos',
            'Para guardar un nuevo horario de atención, primero debe ingresar todos los datos solicitados',
            'error'
          );
        }
      });
  }

  // Crear nuevo paciente
  guardarNuevoPaciente() {
    this.paciente = {
      "idPaciente": 0,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "telefono": this.nroTelefono,
      "afiliacionSalud": this.afiliacion,
      "fechaNacimiento": "",
      "ocupacion": "",
      "institucion": "",
      "estadoCivil": "",
      "familiaNuclear": "",
      "estado": "",
      "atenciones": [],
      "anamnesis": null!,
      "fichaTratamiento": null!
    }

    this.pacienteService.crearPaciente(this.paciente).subscribe(paciente => {
      this.paciente = paciente;
      swal.fire("Paciente creado!", "Ahora puede proceder a agendar la hora de atención.", "success");
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

  // Buscar paciente para cargar sus datos en el formulario 
  searchPatients(values: any) {

    // Busca pacientes por su nombre
    if (values.nombre && values.apellido == "") {
      this.pacienteService.obtenerPacientesPorNombreSinPaginar(values.nombre).subscribe(res => {
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
    // Busca pacientes por su apellido
    else if (values.nombre == "" && values.apellido) {
      this.pacienteService.obtenerPacientesPorApellidoSinPaginar(values.apellido).subscribe(res => {
        this.pacientes = res as Paciente[];
        console.log(this.pacientes);
      },
        error => {
          if (error.status == 404) {
            swal.fire(
              "No encontrado!",
              "No se han encontrado pacientes con el apellido ingresado. Intente nuevamente.",
              "error"
            );
          }
        });
    }
    // Busca pacientes por nombre y apellido
    else if (values.nombre && values.apellido) {
      this.pacienteService.obtenerPacientesPorNombreApellidoSinPaginar(values.nombre, values.apellido).subscribe(res => {
        this.pacientes = res as Paciente[];
        console.log(this.pacientes);
      },
        error => {
          if (error.status == 404) {
            swal.fire(
              "No encontrado!",
              "No se han encontrado pacientes con el nombre completo ingresado. Intente nuevamente.",
              "error"
            );
          }
        });
    }
  }

  // Carga los datos de un paciente
  loadPatientData(idPaciente: number) {
    this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
      this.paciente = paciente;

      swal.fire("Paciente seleccionado!", "Ahora puede proceder a agendar la hora de atención.", "success");
    });
  }

  // Para saber si es un paciente permanente o uno nuevo
  permanentOrNewPatient(type: boolean) {
    if (type) this.pacientePermanente = true;
    else this.pacientePermanente = false;
  }

  // Al seleccionar el tipo de paciente, permite volver a atrás
  goBack() {
    // Para refrescar componente
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
