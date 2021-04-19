import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  // URL principal del backend
  url: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  // Obtener los pacientes, paginados
  obtenerPacientes(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}pacientes/get/page/${page}`).pipe(tap(
      (response: any) => {
        // Verificar correcto funcionamiento
        (response.content as Paciente[]).forEach(paciente => console.log(paciente.nombre));
      }
    )); 
  }
  
  // Actualizar un paciente
  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/update/${paciente.idPaciente}`, paciente);
  }
}
