import { Anamnesis } from '../anamnesis/anamnesis';
import { FichaTratamiento } from '../ficha-tratamiento/ficha-tratamiento';
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
  fichaTratamiento!: FichaTratamiento;

  constructor() {

  }
}
