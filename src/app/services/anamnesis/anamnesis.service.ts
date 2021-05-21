import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anamnesis } from 'src/app/classes/anamnesis/anamnesis';

@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  // Actualizar una anamnesis
  updateAnamnesis(anamnesis: Anamnesis, idAnamnesis: number): Observable<Anamnesis> {
    return this.http.put<Anamnesis>(`${this.url}anamnesis/update/${idAnamnesis}`, anamnesis);
  }

  // Eliminación lógica de una ananmnesis
  deleteAnamnesis(anamnesis: Anamnesis, idAnamnesis: number): Observable<Anamnesis> {
    return this.http.put<Anamnesis>(`${this.url}anamnesis/delete/${idAnamnesis}`, anamnesis);
  }

  // Reintegración lógica de una anamnesis
  reintegrarAnamnesis(anamnesis: Anamnesis, idAnamnesis: number): Observable<Anamnesis> {
    return this.http.put<Anamnesis>(`${this.url}anamnesis/integrate/${idAnamnesis}`, anamnesis);
  }
}
