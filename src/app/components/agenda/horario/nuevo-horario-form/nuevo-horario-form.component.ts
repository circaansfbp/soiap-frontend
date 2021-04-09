import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { HorarioAtencionService } from 'src/app/services/horario-atencion.service';

@Component({
  selector: 'app-nuevo-horario-form',
  templateUrl: './nuevo-horario-form.component.html',
  styleUrls: ['./nuevo-horario-form.component.css']
})
export class NuevoHorarioFormComponent implements OnInit {

  nuevoHorarioForm: FormGroup;
  nuevaHoraAtencion!: HorarioAtencion;
  nuevoPaciente!: Paciente;

  constructor(private formBuilder: FormBuilder,
    private horarioAtencionService: HorarioAtencionService) {

    this.nuevoHorarioForm = this.formBuilder.group({
      nombrePaciente: ['', Validators.required],
      apellidoPaciente: ['', Validators.required],
      telefonoPaciente: ['', [
        Validators.required, Validators.pattern(/^[0-9]+$/),
        Validators.minLength(8), Validators.maxLength(8)
      ]],
      afiliacionSaludPaciente: ['', Validators.required],
      nroConsulta: ['', Validators.pattern(/^[0-9]+$/)], // VALIDAR QUE EL NÚMERO NO SEA NEGATIVO
      fechaAtencion: ['', Validators.required],
      horaAtencion: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

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

  // Guardar los datos
  guardarNuevoHorario() {

    // Crear el nuevo paciente asociado a la hora de atención
    this.nuevoPaciente = {
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

    // Crear la nueva hora de atención
    this.nuevaHoraAtencion = {
      "asistencia": false,
      "confirmaAsistencia": false,
      "horaAtencion": this.nuevoHorarioForm.get('horaAtencion')?.value,
      "fechaAtencion": this.nuevoHorarioForm.get('fechaAtencion')?.value,
      "nroConsulta": this.nuevoHorarioForm.get('nroConsulta')?.value,
      "disponible": false,
      "paciente": this.nuevoPaciente
    };

    // AGREGAR CONFIRMACIÓN DE LA OPERACIÓN SWEET ALERT
    this.horarioAtencionService.crearNuevoHorarioAtencion(this.nuevaHoraAtencion).subscribe((res: any) => {
      console.log(res);
    });
  }
}
