import { HorarioAtencion } from '../horario-atencion/horario-atencion';

export class Paciente {
  nombre!: string;
  apellido!: string;
  telefono!: string;
  fechaNacimiento!: Date;
  ocupacion!: string;
  institucion!: string;
  afiliacionSalud!: string;
  estadoCivil!: string;
  familiaNuclear!: string;

  constructor() {

  }
}
