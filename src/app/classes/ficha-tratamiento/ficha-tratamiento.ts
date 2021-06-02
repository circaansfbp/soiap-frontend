import { SesionTerapia } from '../sesion-terapia/sesion-terapia';

export class FichaTratamiento {
  idFichaTratamiento!: number;
  fechaDiagnostico!: string;
  motivoConsultaProfesional!: string;
  resultadoDiagnostico!: string;
  sugerenciaTratamiento!: string;
  objetivosTerapia!: string;
  sesiones!: SesionTerapia[];

  constructor() { }
}
