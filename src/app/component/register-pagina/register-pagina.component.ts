import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

//model
import { UsuarioModel } from 'src/app/model/usuario';

@Component({
  selector: 'app-register-pagina',
  templateUrl: './register-pagina.component.html',
  styleUrls: ['./register-pagina.component.css']
})
export class RegisterPaginaComponent {  

  usuario_model : UsuarioModel ={
    usuario: '',
    pass: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  };

  constructor(private servicio:UsuarioService, private ruta:Router)
  { 

  }

  Registro_User(usuario_model_html:any)
  {
    this.usuario_model=usuario_model_html;
    this.servicio.RegistrarUsuario(this.usuario_model).subscribe(
      (res:any) => {
        if (res['mensaje'] == 'TRUE')
        {
          alert('Cuenta registrada correctamente.');
          this.inicio_pagina();
        }
        else if (res['mensaje'] == 'FALSE')
        {
          alert('La cuenta con el usuario: "' + this.usuario_model.usuario + '", ya existe en la base de datos.');
        }
        else{
          alert('Error en el servidor.');
        }
      },
      (error) => { console.log("Error generado: ",error)}
    );
  }


  //--------Rutas--------//
  inicio_pagina()
  {
    this.ruta.navigate(['/pagina-inicio/']);
  }
  //--------Rutas--------//

}
