import { Paciente } from '../paciente/paciente';

export class HorarioAtencion {
  asistencia!: boolean;
  confirmaAsistencia!: boolean;
  horaAtencion!: any;
  fechaAtencion!: Date;
  nroConsulta!: number;
  disponible!: boolean;
  paciente!: Paciente;
  // Falta agregar el pago!

  constructor() { }
}
