import { HorarioAtencion } from '../horario-atencion/horario-atencion';

export class Paciente {
  idPaciente!: number;
  nombre!: string;
  apellido!: string;
  telefono!: string;
  fechaNacimiento!: Date;
  ocupacion!: string;
  institucion!: string;
  afiliacionSalud!: string;
  estadoCivil!: string;
  familiaNuclear!: string;
  estado!: string;
  atenciones: HorarioAtencion[] = new Array();
}
