import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  title: string = "Modificar datos";
  subtitle: string = "A continuación, puede realizar los cambios necesarios:";

  paciente: Paciente = new Paciente();

  constructor() { }

  ngOnInit(): void {
  }

}
