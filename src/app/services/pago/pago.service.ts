import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from 'src/app/classes/pago/pago';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

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

  // Registrar un pago
  registerPayment(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${this.url}pago`, pago, { headers: this.addAuthorization() });
  }

  // Actualizar un pago
  updatePayment(pago: Pago, idPago: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.url}pago/update/${idPago}`, pago, { headers: this.addAuthorization() });
  }
}
