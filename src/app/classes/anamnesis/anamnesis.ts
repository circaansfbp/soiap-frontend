import { Paciente } from "../paciente/paciente";

export class Anamnesis {
  idAnamnesis!: number;
  fechaAnamnesis!: string;
  motivoConsultaPaciente!: string;
  antecedentesPaciente!: string;
  antecedentesFamiliares!: string;
  observaciones!: string;
  estado!: string;
  paciente!: Paciente;

  constructor() { }
}
