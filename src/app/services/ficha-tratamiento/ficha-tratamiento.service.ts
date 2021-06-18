import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaTratamiento } from 'src/app/classes/ficha-tratamiento/ficha-tratamiento';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FichaTratamientoService {

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

  // Actualizar una ficha de tratamiento
  updateFichaTratamiento(fichaTratamiento: FichaTratamiento, idFichaTratamiento: number): Observable<FichaTratamiento> {
    return this.http.put<FichaTratamiento>(`${this.url}ficha-tratamiento/update/${idFichaTratamiento}`, fichaTratamiento, { headers: this.addAuthorization() });
  }

  // Reintegración lógica de una ficha de tratamiento
  reintegrarFichaTratamiento(fichaTratamiento: FichaTratamiento, idFichaTratamiento: number): Observable<FichaTratamiento> {
    return this.http.put<FichaTratamiento>(`${this.url}ficha-tratamiento/integrate/${idFichaTratamiento}`, fichaTratamiento, { headers: this.addAuthorization() });
  }
}
