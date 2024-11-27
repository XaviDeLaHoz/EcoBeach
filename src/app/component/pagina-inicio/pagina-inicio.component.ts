import { Component } from '@angular/core';
import { Router } from '@angular/router';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

//model
import { UsuarioModel } from 'src/app/model/usuario';


@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})

export class PaginaInicioComponent{
  eventoSeleccionado: any;

  usuario_model : UsuarioModel ={
    usuario: '',
    pass: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };
  
  constructor(private servicio:UsuarioService, private ruta:Router){}
  

  //----------------------- Registro -----------------------//
    Registro_User(usuario_model_html:any)
    {
      this.usuario_model=usuario_model_html;
      this.servicio.RegistrarUsuario(this.usuario_model).subscribe(
        (res:any) => {
          if (res['mensaje'] == 'TRUE')
          {
            alert('Cuenta registrada correctamente.');
            window.location.reload();
          }
          else if (res['mensaje'] == 'FALSE')
          {
            alert('La cuenta con el usuario: "' + this.usuario_model.usuario + '" ya existe en la base de datos.');
          }
          else{
            alert('Error en el servidor.');
          }
        },
        (error) => { console.log("Error generado: ",error)}
      );
    }
  //----------------------- Registro -----------------------//
  

  //--------Modal--------//
    mostrarModal() {
      this.eventoSeleccionado = true;
      // Muestra el modal
      (document.querySelector('.modal') as HTMLElement).style.display = 'block';
    }

    cerrarModal() {
      
      // Cierra el modal y limpia el evento seleccionado
      (document.querySelector('.modal') as HTMLElement).style.display = 'none';
      this.eventoSeleccionado = null;
    }
    
    
    CrearUsuario(usuario_model_html:any) {
      this.Registro_User(usuario_model_html);
    } 
  //--------Modal--------//


  //--------Rutas--------//
    login_pagina()
    {
      this.ruta.navigate(['/pagina-login/']);
    }

    register_pagina()
    {
      this.ruta.navigate(['/pagina-register/']);
    }
  //--------Rutas--------//
}
