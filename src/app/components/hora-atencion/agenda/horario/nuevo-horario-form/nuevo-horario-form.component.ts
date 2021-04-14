import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  nuevoHorarioForm: FormGroup;
  horarioAtencion: HorarioAtencion = new HorarioAtencion();
  paciente!: Paciente;
  idAtencion!: number;
  idPaciente!: number;

  constructor(private formBuilder: FormBuilder,
    private horarioAtencionService: HorarioAtencionService,
    private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    // ReactiveForm que valida los campos 
    this.nuevoHorarioForm = this.formBuilder.group({
      nombrePaciente: ["", Validators.required],
      apellidoPaciente: ["", Validators.required],
      telefonoPaciente: ["", [
        Validators.required, Validators.pattern(/^[0-9]+$/),
        Validators.minLength(8), Validators.maxLength(8)
      ]],
      afiliacionSaludPaciente: ["", Validators.required],
      nroConsulta: ["", Validators.pattern(/^[0-9]+$/)],
      fechaAtencion: ["", Validators.required],
      horaAtencion: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadHorarioAtencionData();
  }

  // Obtener los valores del formulario para manejo de errores desde la vista
  get nombrePaciente() {
    return this.nuevoHorarioForm.get('nombrePaciente');
  }

  get apellidoPaciente() {
    return this.nuevoHorarioForm.get('apellidoPaciente');
  }

  get telefonoPaciente() {
    return this.nuevoHorarioForm.get('telefonoPaciente');
  }

  get afiliacionSaludPaciente() {
    return this.nuevoHorarioForm.get('afiliacionSaludPaciente');
  }

  get nroConsulta() {
    return this.nuevoHorarioForm.get('nroConsulta');
  }

  get fechaAtencion() {
    return this.nuevoHorarioForm.get('fechaAtencion');
  }

  get horaAtencion() {
    return this.nuevoHorarioForm.get('horaAtencion');
  }

  // Al crear o modificar un horario de atención, este método crea/modifica los objetos de hora de 
  // atención y su paciente asociado
  objetosHorarioAtencionPaciente() {
    // Crea el nuevo paciente asociado a la hora de atención
    this.paciente = {
      "idPaciente": this.idPaciente,
      "nombre": this.nuevoHorarioForm.get('nombrePaciente')?.value,
      "apellido": this.nuevoHorarioForm.get('apellidoPaciente')?.value,
      "telefono": `+569${this.nuevoHorarioForm.get('telefonoPaciente')?.value}`,
      "fechaNacimiento": new Date(),
      "ocupacion": "",
      "institucion": "",
      "afiliacionSalud": this.nuevoHorarioForm.get('afiliacionSaludPaciente')?.value,
      "estadoCivil": "",
      "familiaNuclear": ""
    }

    // Crea la nueva hora de atención
    this.horarioAtencion = {
      "idAtencion": this.idAtencion,
      "asistencia": false,
      "confirmaAsistencia": false,
      "horaAtencion": this.nuevoHorarioForm.get('horaAtencion')?.value,
      "fechaAtencion": this.nuevoHorarioForm.get('fechaAtencion')?.value,
      "nroConsulta": this.nuevoHorarioForm.get('nroConsulta')?.value,
      "disponible": false,
      "paciente": this.paciente
    };
  }

  // Guardar los datos
  guardarNuevoHorario() {
    this.objetosHorarioAtencionPaciente();
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
          (res) => {
            this.nuevoHorarioForm.setValue({
              "nombrePaciente": res.paciente.nombre,
              "apellidoPaciente": res.paciente.apellido,
              "telefonoPaciente": res.paciente.telefono,
              "afiliacionSaludPaciente": res.paciente.afiliacionSalud,
              "nroConsulta": res.nroConsulta,
              "fechaAtencion": res.fechaAtencion,
              "horaAtencion": res.horaAtencion
            });

            //ARREGLAR NRO DE TELÉFONO (SACAR +569)

            // Guardar los ID para realizar la actualización 
            this.idAtencion = res.idAtencion;
            this.idPaciente = res.paciente.idPaciente;

            // Necesario para que la vista sepa cuál botón mostrar
            this.horarioAtencion.idAtencion = res.idAtencion;
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
        this.objetosHorarioAtencionPaciente();
        
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
}
