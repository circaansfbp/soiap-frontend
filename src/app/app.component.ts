import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title: string = 'Sistema de organización de info. y atención psicológica';
  fixNav: boolean = false;

  currentRoute!: string;

  constructor(public auth: AuthService,
    public router: Router) {

    router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => this.currentRoute = event.url);
  }

  logout() {
    swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Está seguro/a que desea terminar su sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro/a',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}



