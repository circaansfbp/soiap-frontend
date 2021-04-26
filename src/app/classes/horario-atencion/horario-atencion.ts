import { Paciente } from '../paciente/paciente';

export class HorarioAtencion {
  idAtencion!: number;
  asistencia!: number;
  confirmaAsistencia!: number;
  horaAtencion!: any;
  fechaAtencion!: string;
  nroConsulta!: number;
  paciente!: Paciente;
  // Falta agregar el pago!

  constructor() { }
}
