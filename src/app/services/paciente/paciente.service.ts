import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // Crear un paciente
  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.url}pacientes`, paciente);
  }

  // Obtener un paciente por su ID
  obtenerPacientePorId(idPaciente: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}pacientes/${idPaciente}`);
  }

  // Obtener todos los pacientes activos, paginados
  obtenerPacientes(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}pacientes/get/page/${page}`).pipe(tap(
      (response: any) => {
        // Verificar correcto funcionamiento
        (response.content as Paciente[]).forEach(paciente => console.log(paciente.nombre));
      }
    ));
  }

  // Obtener todos los pacientes inactivos, paginados
  obtenerPacientesInactivos(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}pacientes/get/inactive/page/${page}`);
  }

  // Buscar pacientes por nombre entre todos los pacientes (activos e inactivos) 
  searchAllPatientsByName(nombre: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${this.url}pacientes/get/all/by-name/page/${page}`, { params });
  }

  // Buscar pacientes por apellido entre todos los pacientes (activos e inactivos)
  searchAllPatientsByLastname(apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/all/by-lastname/page/${page}`, { params });
  }

  // Buscar pacientes por nombre y apellido entre todos los pacientes (activos e inactivos)
  searchAllPatientsByNameAndLastname(nombre: string, apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/all/by-name-lastname/page/${page}`, { params });
  }

  // Obtener pacientes activos por nombre, paginados
  obtenerPacientesPorNombre(nombre: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${this.url}pacientes/get/by-name/page/${page}`, { params });
  }

  // Obtener pacientes por nombre, sin paginar
  obtenerPacientesPorNombreSinPaginar(nombre: string): Observable<Paciente[]> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<Paciente[]>(`${this.url}pacientes/get/by-name`, { params });
  }

  // Obtener pacientes inactivos por nombre, paginados
  obtenerPacientesInactivosPorNombre(nombre: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${this.url}pacientes/get/inactive/by-name/page/${page}`, { params });
  }

  // Obtener pacientes por apellido, paginados
  obtenerPacientesPorApellido(apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/by-lastname/page/${page}`, { params });
  }

  // Obtener pacientes por apellido, sin paginar
  obtenerPacientesPorApellidoSinPaginar(apellido: string): Observable<Paciente[]> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<Paciente[]>(`${this.url}pacientes/get/by-lastname/`, { params });
  }

  // Obtener pacientes inactivos por apellido
  obtenerPacientesInactivosPorApellido(apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/inactive/by-lastname/page/${page}`, { params });
  }

  // Obtener pacientes por nombre y apellido, paginados 
  obtenerPacientesPorNombreApellido(nombre: string, apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/by-name-lastname/page/${page}`, { params });
  }

  // Obtener pacientes por nombre y apellido, sin paginar
  obtenerPacientesPorNombreApellidoSinPaginar(nombre: string, apellido: string): Observable<Paciente[]> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<Paciente[]>(`${this.url}pacientes/get/by-name-lastname`, { params });
  }

  // Obtener pacientes inactivos por nombre y apellido, paginados
  obtenerPacientesInactivosPorNombreApellido(nombre: string, apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/inactive/by-name-lastname/page/${page}`, { params });
  }

  // Actualizar un paciente
  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/update/${paciente.idPaciente}`, paciente);
  }

  // Eliminar un paciente
  eliminarPaciente(paciente: Paciente, idPaciente: number): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/delete/${idPaciente}`, paciente);
  }

  // Reintegrar un paciente a la consulta
  reintegrarPaciente(paciente: Paciente, idPaciente: number): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/integrate/${idPaciente}`, paciente);
  }
}
