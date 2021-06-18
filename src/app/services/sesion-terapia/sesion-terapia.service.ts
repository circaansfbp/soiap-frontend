import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionTerapia } from 'src/app/classes/sesion-terapia/sesion-terapia';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SesionTerapiaService {

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

  // Crear una nueva sesión de terapia
  createSession(sesion: SesionTerapia): Observable<SesionTerapia> {
    return this.http.post<SesionTerapia>(`${this.url}sesion-terapia`, sesion, { headers: this.addAuthorization() });
  }

  // Obtener una sesión de terapia específica
  getSesion(idSesion: number): Observable<SesionTerapia> {
    return this.http.get<SesionTerapia>(`${this.url}sesion-terapia/${idSesion}`, { headers: this.addAuthorization() });
  }

  // Actualizar una sesión de terapia
  updateSesion(sesion: SesionTerapia, idSesion: number): Observable<SesionTerapia> {
    return this.http.put<SesionTerapia>(`${this.url}sesion-terapia/update/${idSesion}`, sesion, { headers: this.addAuthorization() });
  }
}
