import { Injectable } from '@angular/core';
import { HorarioAtencion } from '../classes/horario-atencion/horario-atencion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService {

  url: string = "http://localhost:8080/api/"

  constructor( private http: HttpClient ) { }

  crearNuevoHorarioAtencion(horarioAtencion: HorarioAtencion) {
    return this.http.post<HorarioAtencion>(`${this.url}atenciones`, horarioAtencion);
  }
  
  obtenerHorariosDelDía(fechaActual: string): Observable<HorarioAtencion[]> {
    return this.http.get<HorarioAtencion[]>(`${this.url}atenciones/get/${fechaActual}`);
  }
}
