import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

//model
import { UsuarioCuenta } from 'src/app/model/usuario';

@Component({
  selector: 'app-ajustes-pagina',
  templateUrl: './ajustes-pagina.component.html',
  styleUrls: ['./ajustes-pagina.component.css']
})
export class AjustesPaginaComponent implements OnInit {

  datos_usuario : UsuarioCuenta = {
    id_usuario: -1,
    usuario: '',
    pass: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };
  
  ngOnInit(): void 
  {
    let user_temp_local = this.servicio.obtener_user_local();
    if (user_temp_local != null)
    {    
      this.datos_usuario = user_temp_local;     
    }
    else
    {
      this.inicio_pagina();
    }
  }

  constructor(private servicio:UsuarioService, private ruta:Router){}

  //---- actualizar usuario ----//
  actualizarUsuario()
  {
    this.servicio.Actualizar_usuario(this.datos_usuario).subscribe(
      (res:any) => {
        if(res['mensaje'])
        {
          alert(res['mensaje']);
          this.servicio.guardar_sesion_local(this.datos_usuario);
          window.location.reload();
        }
      },
      (error) => { console.log("Error generado: ",error)}
    );
  }
  //---- actualizar usuario ----//

  //--------Rutas--------//
    inicio_pagina()
    {
      this.ruta.navigate(['/inicio-pagina/']);
    }

    cambio_pass_pagina()
    {
      this.ruta.navigate(['/pagina-cambio.pass/']);
    }
  //--------Rutas--------//

}
