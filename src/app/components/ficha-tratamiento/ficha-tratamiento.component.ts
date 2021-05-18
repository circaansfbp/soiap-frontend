import { Component, Input, OnInit } from '@angular/core';
import { FichaTratamiento } from 'src/app/classes/ficha-tratamiento/ficha-tratamiento';
import { Paciente } from 'src/app/classes/paciente/paciente';

@Component({
  selector: 'app-ficha-tratamiento',
  templateUrl: './ficha-tratamiento.component.html',
  styleUrls: ['./ficha-tratamiento.component.css']
})
export class FichaTratamientoComponent implements OnInit {

  // Paciente asociado a la ficha de tratamiento
  @Input() paciente: Paciente = new Paciente();

  // Para desplegar la fecha en la que se creó la ficha de tratamiento
  @Input() fechaCreacionFicha!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
