import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/classes/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL principal del backend
  url: string = "http://localhost:8080/oauth/token";

  private _usuario!: Usuario;
  private _token!: string;

  constructor(private http: HttpClient,
    private router: Router) { }

  get usuario(): Usuario {
    if (this._usuario != null) return this._usuario;

    else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }

    return new Usuario();
  }

  get token(): string {
    if (this._token != null) return this._token;

    else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }

    return '';
  }
  
  // Para verificar si es un usuario autorizado
  // AGREGAR CHECKEO DE AUTORIZACIÓN A TODOS LOS SERVICIOS?
  isUnauthorized(error: any): boolean {
    if (error.status == 401 || error.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    let payload = this.getDataFromAccessToken(this.token);

    if (payload != null && payload.user_name && payload.user_name.length > 0) return true;
    
    return false;
  }

  login(usuario: Usuario): Observable<any> {
    const appCredentiales: string = btoa('soiap-frontend' + ':' + 'SOIAPfrontEND');
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic ' + appCredentiales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(`${this.url}`, params.toString(), { headers: httpHeaders });
  }

  saveUser(accessToken: string) {
    let payload = this.getDataFromAccessToken(accessToken);

    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  saveToken(accessToken: string) {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  getDataFromAccessToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return null;
  }
}
