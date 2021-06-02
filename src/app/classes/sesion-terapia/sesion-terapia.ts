import { FichaTratamiento } from '../ficha-tratamiento/ficha-tratamiento';

export class SesionTerapia {
  idSesion!: number;
  nroSesion!: number;
  fechaSesion!: string;
  observaciones!: string;
  estado!: string;
  fichaTratamiento!: FichaTratamiento;

  constructor() { }
}
