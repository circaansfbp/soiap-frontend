import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Paciente } from 'src/app/classes/paciente/paciente';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

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

  // Crear un paciente
  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.url}pacientes`, paciente, { headers: this.addAuthorization() });
  }

  // Obtener un paciente por su ID
  obtenerPacientePorId(idPaciente: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}pacientes/${idPaciente}`, { headers: this.addAuthorization() });
  }

  // Obtener todos los pacientes activos, paginados
  obtenerPacientes(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}pacientes/get/page/${page}`, { headers: this.addAuthorization() }).pipe(tap(
      (response: any) => {
        // Verificar correcto funcionamiento
        (response.content as Paciente[]).forEach(paciente => console.log(paciente.nombre));
      }
    ));
  }

  // Obtener todos los pacientes inactivos, paginados
  obtenerPacientesInactivos(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}pacientes/get/inactive/page/${page}`, { headers: this.addAuthorization() });
  }

  // Buscar pacientes por nombre entre todos los pacientes (activos e inactivos) 
  searchAllPatientsByName(nombre: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${this.url}pacientes/get/all/by-name/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Buscar pacientes por apellido entre todos los pacientes (activos e inactivos)
  searchAllPatientsByLastname(apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/all/by-lastname/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Buscar pacientes por nombre y apellido entre todos los pacientes (activos e inactivos)
  searchAllPatientsByNameAndLastname(nombre: string, apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/all/by-name-lastname/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes activos por nombre, paginados
  obtenerPacientesPorNombre(nombre: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${this.url}pacientes/get/by-name/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes por nombre, sin paginar
  obtenerPacientesPorNombreSinPaginar(nombre: string): Observable<Paciente[]> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<Paciente[]>(`${this.url}pacientes/get/by-name`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes inactivos por nombre, paginados
  obtenerPacientesInactivosPorNombre(nombre: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${this.url}pacientes/get/inactive/by-name/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes por apellido, paginados
  obtenerPacientesPorApellido(apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/by-lastname/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes por apellido, sin paginar
  obtenerPacientesPorApellidoSinPaginar(apellido: string): Observable<Paciente[]> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<Paciente[]>(`${this.url}pacientes/get/by-lastname/`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes inactivos por apellido
  obtenerPacientesInactivosPorApellido(apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/inactive/by-lastname/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes por nombre y apellido, paginados 
  obtenerPacientesPorNombreApellido(nombre: string, apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/by-name-lastname/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes por nombre y apellido, sin paginar
  obtenerPacientesPorNombreApellidoSinPaginar(nombre: string, apellido: string): Observable<Paciente[]> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<Paciente[]>(`${this.url}pacientes/get/by-name-lastname`, { params, headers: this.addAuthorization() });
  }

  // Obtener pacientes inactivos por nombre y apellido, paginados
  obtenerPacientesInactivosPorNombreApellido(nombre: string, apellido: string, page: number): Observable<any> {
    let params = new HttpParams().set('nombre', nombre).set('apellido', apellido);
    return this.http.get<any>(`${this.url}pacientes/get/inactive/by-name-lastname/page/${page}`, { params, headers: this.addAuthorization() });
  }

  // Actualizar un paciente
  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/update/${paciente.idPaciente}`, paciente, { headers: this.addAuthorization() });
  }

  // Eliminar un paciente
  eliminarPaciente(paciente: Paciente, idPaciente: number): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/delete/${idPaciente}`, paciente, { headers: this.addAuthorization() });
  }

  // Reintegrar un paciente a la consulta
  reintegrarPaciente(paciente: Paciente, idPaciente: number): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}pacientes/integrate/${idPaciente}`, paciente, { headers: this.addAuthorization() });
  }
}
