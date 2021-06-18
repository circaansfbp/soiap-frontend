import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anamnesis } from 'src/app/classes/anamnesis/anamnesis';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {

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

  // Actualizar una anamnesis
  updateAnamnesis(anamnesis: Anamnesis, idAnamnesis: number): Observable<Anamnesis> {
    return this.http.put<Anamnesis>(`${this.url}anamnesis/update/${idAnamnesis}`, anamnesis, { headers: this.addAuthorization() });
  }

  // Reintegración lógica de una anamnesis
  reintegrarAnamnesis(anamnesis: Anamnesis, idAnamnesis: number): Observable<Anamnesis> {
    return this.http.put<Anamnesis>(`${this.url}anamnesis/integrate/${idAnamnesis}`, anamnesis, { headers: this.addAuthorization() });
  }
}
