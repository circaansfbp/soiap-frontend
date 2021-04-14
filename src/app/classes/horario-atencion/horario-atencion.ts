import { Paciente } from '../paciente/paciente';

export class HorarioAtencion {
  idAtencion!: number;
  asistencia!: boolean;
  confirmaAsistencia!: boolean;
  horaAtencion!: any;
  fechaAtencion!: string;
  nroConsulta!: number;
  disponible!: boolean;
  paciente!: Paciente;
  // Falta agregar el pago!

  constructor() { }
}
