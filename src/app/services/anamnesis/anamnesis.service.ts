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
}
