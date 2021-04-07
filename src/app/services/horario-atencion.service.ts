import { Injectable } from '@angular/core';
import { HorarioAtencion } from '../classes/horario-atencion/horario-atencion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService {

  constructor( private http: HttpClient ) { }

  crearNuevoHorarioAtencion(horarioAtencion: HorarioAtencion) {
    return this.http.post<HorarioAtencion>("http://localhost:8080/api/atenciones", horarioAtencion);
  } 
}
