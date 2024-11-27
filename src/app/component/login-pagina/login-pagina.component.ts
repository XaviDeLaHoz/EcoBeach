import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

//model
import { UsuarioCuenta } from 'src/app/model/usuario';



@Component({
  selector: 'app-login-pagina',
  templateUrl: './login-pagina.component.html',
  styleUrls: ['./login-pagina.component.css']
})
export class LoginPaginaComponent {

  cuenta_model: UsuarioCuenta = {
    id_usuario: -1,
    usuario: '',
    pass: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };

  constructor(private servicio: UsuarioService, private ruta: Router, private sanitizer: DomSanitizer) {}
  //---------------- Login ----------------//
  login_sesion(usuario_model_html: any) {
    this.servicio.iniciar_sesion(usuario_model_html).subscribe(
      (resultado: any) => {
        if (resultado[0] != null) {
          if (resultado[0].contraseña == usuario_model_html.pass){         
            // ------- asignar al modelo ------- //
            this.cuenta_model.id_usuario = resultado[0].idcuentas_usuarios;
            this.cuenta_model.usuario = resultado[0].usuario;
            this.cuenta_model.pass = resultado[0].contraseña;
            this.cuenta_model.nombres = resultado[0].nombres;
            this.cuenta_model.apellidos = resultado[0].apellidos;
            this.cuenta_model.telefono = resultado[0].telefono;
            this.cuenta_model.correo = resultado[0].correo;
            this.servicio.guardar_sesion_local(this.cuenta_model);
            alert('Bienvenido al sistema.');
            this.bienvenida_pagina();
          }
          else
          {
            alert('Contraseña incorrecta.');
          }
        }
        else if (resultado[0] == null) {
          alert('Datos incorrectos.');
        }
        else {
          alert('Ocurrió un error inesperado.');
        }
      }
    );
  }
  //---------------- Login ----------------//


  //--------Rutas--------//
  bienvenida_pagina() {
    this.ruta.navigate(['/pagina-bienvenida/']);
  }
  //--------Rutas--------//
}


