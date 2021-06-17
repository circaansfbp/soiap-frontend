import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Iniciar sesión";

  // Para manejar el usuario
  usuario: Usuario;

  constructor(private auth: AuthService,
    private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigate(['/agenda']);
  }

  // Iniciar sesión
  login() {
    if (this.usuario.username.startsWith(' ') || this.usuario.password.startsWith(' ')) {
      swal.fire('Credenciales incorrectas!', 'Debe ingresar sus credenciales.', 'error');
      return;
    }

    this.auth.login(this.usuario).subscribe(userLoggedIn => {
      
      this.auth.saveUser(userLoggedIn.access_token);
      this.auth.saveToken(userLoggedIn.access_token);

      swal.fire(
        `Bienvenid@ ${userLoggedIn.nombre_usuario}!`,
        'Has iniciado sesión correctamente.',
        'success'
      );
      this.router.navigate(['/agenda']);
    }, error => {
      if (error.status == 400) {
        swal.fire(
          'Credenciales incorrectas!',
          'Nombre de usuario o clave incorrecta. Por favor, intente nuevamente.',
          'error'
        );
      }
    });
  }
}
