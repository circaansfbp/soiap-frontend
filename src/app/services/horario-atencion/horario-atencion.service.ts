import { Injectable } from '@angular/core';
import { HorarioAtencion } from '../../classes/horario-atencion/horario-atencion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  // Headers
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  // Para solicitar la autorización de acceso a un recurso del backend mediante token
  private addAuthorization() {
    let token = this.auth.token;

    if (token != null && token != '') {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.httpHeaders;
  }

  // Crear un nuevo horario de atención
  crearNuevoHorarioAtencion(horarioAtencion: HorarioAtencion) {
    return this.http.post<HorarioAtencion>(`${this.url}atenciones`, horarioAtencion, { headers: this.addAuthorization() });
  }

  // Obtener los horarios de atención del día actual
  obtenerHorariosDelDía(fechaActual: string): Observable<HorarioAtencion[]> {
    return this.http.get<HorarioAtencion[]>(`${this.url}atenciones/get/${fechaActual}`, { headers: this.addAuthorization() });
  }

  // Obtener un horario específico por su ID
  obtenerHorario(idAtencion: number): Observable<HorarioAtencion> {
    return this.http.get<HorarioAtencion>(`${this.url}atenciones/${idAtencion}`, { headers: this.addAuthorization() });
  }

  // Actualizar un horario de atención
  modificarHorario(horarioAtencion: HorarioAtencion): Observable<HorarioAtencion> {
    return this.http.put<HorarioAtencion>(`${this.url}atenciones/update/${horarioAtencion.idAtencion}`, horarioAtencion, { headers: this.addAuthorization() });
  }

  // Eliminar (eliminación física) un horario de atención
  eliminarHorario(idAtencion: number): Observable<String> {
    return this.http.delete<String>(`${this.url}atenciones/delete/${idAtencion}`, { headers: this.addAuthorization() });
  }
}
