import { Injectable } from '@angular/core';
import { HorarioAtencion } from '../classes/horario-atencion/horario-atencion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioAtencionService {

  url: string = "http://localhost:8080/api/"

  constructor( private http: HttpClient ) { }

  crearNuevoHorarioAtencion(horarioAtencion: HorarioAtencion) {
    return this.http.post<HorarioAtencion>("${url}atenciones", horarioAtencion);
  }
  
  obtenerHorariosDelDía(fechaActual: Date) {
    return this.http.get<HorarioAtencion[]>(`${this.url}atenciones/get/${fechaActual}`).subscribe((res: any) => {
      console.log(res);
    })
  }
}
