import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaTratamiento } from 'src/app/classes/ficha-tratamiento/ficha-tratamiento';

@Injectable({
  providedIn: 'root'
})
export class FichaTratamientoService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  // Actualizar una ficha de tratamiento
  updateFichaTratamiento(fichaTratamiento: FichaTratamiento, idFichaTratamiento: number): Observable<FichaTratamiento> {
    return this.http.put<FichaTratamiento>(`${this.url}ficha-tratamiento/update/${idFichaTratamiento}`, fichaTratamiento);
  }

  // Reintegración lógica de una ficha de tratamiento
  reintegrarFichaTratamiento(fichaTratamiento: FichaTratamiento, idFichaTratamiento: number): Observable<FichaTratamiento> {
    return this.http.put<FichaTratamiento>(`${this.url}ficha-tratamiento/integrate/${idFichaTratamiento}`, fichaTratamiento);
  }
}
