import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionTerapia } from 'src/app/classes/sesion-terapia/sesion-terapia';

@Injectable({
  providedIn: 'root'
})
export class SesionTerapiaService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  // Crear una nueva sesión de terapia
  createSession(sesion: SesionTerapia): Observable<SesionTerapia> {
    return this.http.post<SesionTerapia>(`${this.url}sesion-terapia`, sesion);
  }
}
