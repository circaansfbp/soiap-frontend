import { Anamnesis } from '../anamnesis/anamnesis';
import { HorarioAtencion } from '../horario-atencion/horario-atencion';

export class Paciente {
  idPaciente!: number;
  nombre!: string;
  apellido!: string;
  telefono!: string;
  fechaNacimiento!: string;
  ocupacion!: string;
  institucion!: string;
  afiliacionSalud!: string;
  estadoCivil!: string;
  familiaNuclear!: string;
  atenciones!: HorarioAtencion[];
  anamnesis!: Anamnesis;  

  constructor() {

  }
}
