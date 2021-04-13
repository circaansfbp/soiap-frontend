import { Injectable } from '@angular/core';
import { HorarioAtencion } from '../classes/horario-atencion/horario-atencion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  // Crear un nuevo horario de atención
  crearNuevoHorarioAtencion(horarioAtencion: HorarioAtencion) {
    return this.http.post<HorarioAtencion>(`${this.url}atenciones`, horarioAtencion);
  }

  // Obtener los horarios de atención del día actual
  obtenerHorariosDelDía(fechaActual: string): Observable<HorarioAtencion[]> {
    return this.http.get<HorarioAtencion[]>(`${this.url}atenciones/get/${fechaActual}`);
  }

  // Obtener un horario específico por su ID
  obtenerHorario(idAtencion: number): Observable<HorarioAtencion> {
    return this.http.get<HorarioAtencion>(`${this.url}atenciones/${idAtencion}`);
  }

  // Actualizar un horario de atención
  modificarHorario(horarioAtencion: HorarioAtencion): Observable<HorarioAtencion> {
    return this.http.put<HorarioAtencion>(`${this.url}atenciones/update/${horarioAtencion.idAtencion}`, horarioAtencion);
  }

  // Eliminar (eliminación física) un horario de atención
  eliminarHorario(idAtencion: number): Observable<String> {
    return this.http.delete<String>(`${this.url}atenciones/delete/${idAtencion}`);
  }
}
