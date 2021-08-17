import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

import * as moment from 'moment';
import swal from 'sweetalert2';
import { Pago } from 'src/app/classes/pago/pago';
import { HorarioAtencionService } from 'src/app/services/horario-atencion/horario-atencion.service';
import { PagoService } from 'src/app/services/pago/pago.service';

@Component({
  selector: 'app-atenciones-paciente',
  templateUrl: './atenciones-paciente.component.html',
  styleUrls: ['./atenciones-paciente.component.css']
})
export class AtencionesPacienteComponent implements OnInit {

  // Para entregar las opciones al filtro
  options: any[] = [
    { value: '', text: 'Filtrar...' },
    { value: 1, text: 'Asistidas' },
    { value: -1, text: 'No asistidas' },
    { value: 2, text: 'Pagadas' },
    { value: -2, text: 'No pagadas' },
    { value: 3, text: 'Asistidas y pagadas' },
    { value: -3, text: 'Asistidas y no pagadas' },
    { value: 0, text: 'Todas las atenciones' }
  ];

  // Para almacenar el paciente al que le corresponden las atenciones
  paciente: Paciente = new Paciente();

  // Para manejar las atenciones del paciente
  atenciones: HorarioAtencion[] = new Array();

  // Para manejar las atenciones filtradas
  filtered: HorarioAtencion[] = new Array();

  // Número total de registros
  total!: number;

  // Página actual
  currentPage: number = 1;

  // Para manejar selección de múltiples horarios de atención
  selected: boolean = false;

  // Arreglo que contiene los horarios a pagar
  appointmentsToPay: HorarioAtencion[] = new Array();

  // Manejo del botón
  clicked: boolean = false;

  // Para manejar el pago
  pago: Pago = new Pago();

  // Para mostrar el detalle de un pago
  horario: HorarioAtencion = new HorarioAtencion();

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    private pacienteService: PacienteService,
    private horarioAtencionService: HorarioAtencionService,
    private pagoService: PagoService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  // Obtiene el paciente al que se le consultan las atenciones agendadas
  getPatient() {
    this.activatedRoute.params.subscribe(param => {
      let idPaciente = param['idPaciente'];

      if (idPaciente) {
        this.pacienteService.obtenerPacientePorId(idPaciente).subscribe(paciente => {
          this.paciente = paciente;

          paciente.atenciones.forEach(atencion => {
            if (moment(atencion.fechaAtencion).isBefore(moment())) {
              this.atenciones.push(atencion);
              this.filtered.push(atencion);
            }
          });

          this.atenciones.sort((firstDate, secondDate) => {
            return +new Date(secondDate.fechaAtencion) - +new Date(firstDate.fechaAtencion);
          });

          this.filtered.sort((firstDate, secondDate) => {
            return +new Date(secondDate.fechaAtencion) - +new Date(firstDate.fechaAtencion);
          });

          // Setea el total de registros
          this.total = this.atenciones.length;
        });
      }
    })
  }

  // Le da formato a la fecha de la atención
  formatDisplayFechaAtencion(horarioAtencion: HorarioAtencion): string {
    return moment(horarioAtencion.fechaAtencion).format("dddd Do MMMM YYYY");
  }

  // En el caso de que se quiera realizar una filtración de la lista
  filtrar(value: number) {

    // Atenciones asistidas
    if (value == 1) {
      this.filtered = this.atenciones.filter(atencion => atencion.asistencia == 1);
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }

    // Atenciones no asistidas
    if (value == -1) {
      this.filtered = this.atenciones.filter(atencion => atencion.asistencia == -1);
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }

    // Atenciones pagadas
    if (value == 2) {
      this.filtered = this.atenciones.filter(atencion => atencion.pago);
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }

    // Atenciones no pagadas
    if (value == -2) {
      this.filtered = this.atenciones.filter(atencion => !atencion.pago);
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }

    // Atenciones asistidas y pagadas
    if (value == 3) {
      this.filtered = this.atenciones.filter(atencion => atencion.asistencia == 1 && atencion.pago);
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }

    // Atenciones asistidas y no pagadas
    if (value == -3) {
      this.filtered = this.atenciones.filter(atencion => atencion.asistencia == 1 && !atencion.pago);
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }

    // Todas las atenciones
    if (value == 0) {
      this.filtered = this.atenciones;
      this.total = this.filtered.length;

      if (this.total <= 10) this.currentPage = 1;
    }
  }

  // Permite comenzar la selección de múltiples horarios de atención que se desean pagar
  payMultiple() {
    let horario!: any;
    let horariosImpagados: HorarioAtencion[] = this.filtered.filter(atencion => atencion.pago == undefined);
    horariosImpagados.forEach(horarioImpagado => {
      if (horarioImpagado.asistencia != -1) horario = horarioImpagado;
    });

    if (!horario) {
      swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Atenciones pagadas!',
        text: 'El paciente no presenta horarios de atención impagados.',
        showConfirmButton: true,
        confirmButtonText: 'OK!',
        timer: 3500
      });

      return;
    }

    swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Seleccione las atenciones que desea pagar!',
      text: 'Una vez finalizado, presione el botón "Confirmar pago".',
      showConfirmButton: true,
      confirmButtonText: 'OK!',
      timer: 3500
    });

    this.selected = true;
  }

  // Para añadir a un array los horarios de atención a pagar
  addHorarioParaPagarlo(horario: HorarioAtencion) {
    horario.pagoMultiple = true;
    this.appointmentsToPay.push(horario);
  }

  // Para remover un horario específico del array de los horarios de atención a pagar
  removerHorario(horario: HorarioAtencion) {
    horario.pagoMultiple = false;

    if (this.appointmentsToPay.length > 0) {
      let index = this.appointmentsToPay.findIndex(atencion => atencion.idAtencion == horario.idAtencion);
      this.appointmentsToPay.splice(index, 1);
    }
  }

  // Para registrar el pago de los horarios de atención contenidos en el array
  confirmPayment() {
    if (this.appointmentsToPay.length > 0) {

      this.pago.cantidadHorasPagadas = this.appointmentsToPay.length;

      this.pagoService.registerPayment(this.pago).subscribe(pagoRegistrado => {
        this.appointmentsToPay.forEach(atencion => {
          atencion.pago = pagoRegistrado;
          this.horarioAtencionService.modificarHorario(atencion).subscribe(atencionPagada => { });
        });

        this.appointmentsToPay = [];

        swal.fire(
          'Horarios pagados!',
          'El pago de los horarios de atención seleccionados fue registrado exitosamente.',
          'success'
        );

        this.selected = false;
      });
    }
  }

  // En caso de que se quiera cancelar la operación de pago múltiple
  cancelPayment() {
    if (this.appointmentsToPay.length > 0) {
      swal.fire({
        title: '¿Cancelar operación?',
        text: '¿Está seguro que desea cancelar el pago de los horarios de atención?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.selected = false;

          this.appointmentsToPay.forEach(horario => horario.pagoMultiple = false);
          this.appointmentsToPay = [];
        }
      });
    }
    else this.selected = false;
  }

  // Mostrar el detalle de un pago
  detallePago(horarioAtencion: HorarioAtencion) {
    this.horario = horarioAtencion;
  }

  // Para volver atrás
  back() {
    this.location.back();
  }

}
