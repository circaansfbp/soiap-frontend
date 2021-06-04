import { Paciente } from '../paciente/paciente';
import { Pago } from '../pago/pago';

export class HorarioAtencion {
  idAtencion!: number;
  asistencia!: number;
  confirmaAsistencia!: number;
  horaAtencion!: any;
  fechaAtencion!: string;
  nroConsulta!: number;
  paciente!: Paciente;
  pago!: Pago;
  pagoMultiple: boolean = false;

  constructor() { }
}
