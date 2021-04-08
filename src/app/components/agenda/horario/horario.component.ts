import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { HorarioAtencionService } from 'src/app/services/horario-atencion.service';

moment.locale("es");

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  // hoursInTheMorning: string[] = ["8:00", "8:50", "9:40", "10:30", "11:20", "12:10", "13:00"];
  // hoursInTheEvening: string[] = ["15:00", "15:50", "16:40", "17:30", "18:20", "19:10", "20:00"];

  horasFechaDelDia: Array<HorarioAtencion> = new Array();
  fechaActual: string = moment().format("YYYY[-]M[-]D");

  constructor(private router: Router,
              private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    this.getAtencionesFechaActual(this.fechaActual);
  }

  nuevoHorario() {
    this.router.navigate(['nuevo-horario']);
  }

  getAtencionesFechaActual(fechaActual: string) {
    return this.horarioAtencionService.obtenerHorariosDelDía(fechaActual).subscribe((res: any) => {
      res.forEach((horario: HorarioAtencion) => this.horasFechaDelDia.push(horario));
    });
  }
}
