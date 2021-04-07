import { Paciente } from '../paciente/paciente';

export class HorarioAtencion {
  idAtencion!: number;
  asistencia!: boolean;
  confirmaAsistencia!: boolean;
  horaAtencion!: any;
  fechaAtencion!: Date;
  nroConsulta!: number;
  disponible!: boolean;
  estado!: string;
  paciente!: Paciente;
  // Falta agregar el pago!
}
