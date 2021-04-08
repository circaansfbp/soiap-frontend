import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioAtencion } from 'src/app/classes/horario-atencion/horario-atencion';
import { HorarioAtencionService } from 'src/app/services/horario-atencion.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  // hoursInTheMorning: string[] = ["8:00", "8:50", "9:40", "10:30", "11:20", "12:10", "13:00"];
  // hoursInTheEvening: string[] = ["15:00", "15:50", "16:40", "17:30", "18:20", "19:10", "20:00"];

  horasFechaDelDía: HorarioAtencion[] = new Array();

  constructor(private router: Router,
              private horarioAtencionService: HorarioAtencionService) { }

  ngOnInit(): void {
    
  }

  nuevoHorario() {
    this.router.navigate(['nuevo-horario']);
  }

}
