import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { Pago } from 'src/app/classes/pago/pago';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';
import { PagoService } from 'src/app/services/pago/pago.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {

  // Recibe el horario de atención que tendrá asociado el pago
  horarioAtencion!: HorarioAtencion;

  // Para manejar el pago
  pago: Pago = new Pago();

  constructor(private horarioAtencionService: HorarioAtencionService,
    private pagoService: PagoService,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.horarioAtencion = new HorarioAtencion();
    this.horarioAtencion.paciente = new Paciente();
    this.loadPaymentData();
  }

  // Registra el pago
  pay() {
    this.pago.cantidadHorasPagadas = 1;
    this.horarioAtencion.pago = this.pago;

    this.horarioAtencionService.modificarHorario(this.horarioAtencion).subscribe(horario => {
      swal.fire(
        'Pago realizado!',
        'El pago del horario de atención ha sido registrado exitosamente.',
        'success'
      );
      this.location.back();
    },
      error => {
        if (error.status == 400) {
          swal.fire(
            'Falta un dato!',
            `${error.error.details[0]}`,
            'error'
          );
        }
      });
  }

  // Cargar los datos del pago que se desea actualizar
  loadPaymentData() {
    this.activatedRoute.params.subscribe(params => {
      let idAtencion = params['idAtencion'];

      if (idAtencion) {
        this.horarioAtencionService.obtenerHorario(idAtencion).subscribe(horario => {
          this.horarioAtencion = horario;

          if (horario.pago) {
            this.pago = horario.pago;
          } 
          else this.pago = new Pago();

        });
      }
    })
  }

  // Actualizar el pago
  updatePayment() {
    this.pagoService.updatePayment(this.pago, this.pago.idPago).subscribe(pago => {
      this.horarioAtencion.pago = pago;
      swal.fire(
        'Datos actualizados!',
        'Los datos del registro del pago han sido actualizados.',
        'success'
      );

      this.location.back();
    });
  }

  // Para volver a la página anterior
  back(): void {
    this.location.back();
  }
}
