import { Component, OnInit, Input } from '@angular/core';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Pago } from 'src/app/classes/pago/pago';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {

  // Recibe el horario de atención que tendrá asociado el pago
  @Input() horarioAtencion: HorarioAtencion = new HorarioAtencion();

  // Para manejar el pago
  pago: Pago = new Pago();

  constructor(private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {

  }

  pay() {
    this.pago.cantidadHorasPagadas = 1;
    this.horarioAtencion.pago = this.pago;

    console.log(this.horarioAtencion);

    this.horarioAtencionService.modificarHorario(this.horarioAtencion).subscribe(horario => {
      swal.fire(
        'Pago realizado!',
        'El pago del horario de atención ha sido registrado exitosamente.',
        'success'
      );
    },
      error => {
        if (error.status == 404) {
          swal.fire(
            'Horario no encontrado',
            'El horario de atención a pagar no ha sido encontrado en los registros',
            'error'
          );
        }
      });
  }
}
