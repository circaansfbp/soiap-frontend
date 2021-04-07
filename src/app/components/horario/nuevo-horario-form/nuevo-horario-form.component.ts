import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-horario-form',
  templateUrl: './nuevo-horario-form.component.html',
  styleUrls: ['./nuevo-horario-form.component.css']
})
export class NuevoHorarioFormComponent implements OnInit {

  nuevoHorarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  // Guardar los datos
  guardarNuevoHorario() {
    console.log(this.nuevoHorarioForm.value);
  }
}
