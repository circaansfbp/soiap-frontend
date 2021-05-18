import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from 'src/app/classes/pago/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  // Registrar un pago
  registerPayment(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${this.url}pago`, pago);
  }

  // Actualizar un pago
  updatePayment(pago: Pago, idPago: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.url}pago/update/${idPago}`, pago);
  }
}
