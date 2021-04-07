import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  hoursInTheMorning: string[] = ["8:00", "8:50", "9:40", "10:30", "11:20", "12:10", "13:00"];
  hoursInTheEvening: string[] = ["15:00", "15:50", "16:40", "17:30", "18:20", "19:10", "20:00"];

  constructor( private router: Router ) { }

  ngOnInit(): void {

  }

  nuevoHorario() {
    this.router.navigate(['nuevo-horario']);
  }

}
