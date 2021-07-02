import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeLink: boolean[] = [false, false];
  title: string = 'Sistema de organización de info. y atención psicológica';
  fixNav: boolean = false;

  constructor(public auth: AuthService,
    public router: Router) { }

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

  clickNavLink(link: number) {
    if (link == 0) {
      this.activeLink[0] = true;
      this.activeLink[1] = false;
    }
    else if (link == 1) {
      this.activeLink[0] = false;
      this.activeLink[1] = true;
    } 
  }
}



