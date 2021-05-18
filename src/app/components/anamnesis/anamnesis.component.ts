import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/classes/paciente/paciente';

@Component({
  selector: 'app-anamnesis',
  templateUrl: './anamnesis.component.html',
  styleUrls: ['./anamnesis.component.css']
})
export class AnamnesisComponent implements OnInit {

  // Recibe el paciente con su respectiva anamnesis
  @Input() paciente: Paciente = new Paciente();

  // Para desplegar la fecha de la anamnesis
  @Input() fechaAnamnesis!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
