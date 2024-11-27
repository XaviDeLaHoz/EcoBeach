import { Component } from '@angular/core';
import { Router } from '@angular/router';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

@Component({
  selector: 'app-cambio.pass-pagina',
  templateUrl: './cambio.pass-pagina.component.html',
  styleUrls: ['./cambio.pass-pagina.component.css']
})
export class CambioPassPaginaComponent {

  constructor(private servicio:UsuarioService, private ruta:Router){}

  pass:any = {
    campo1: '',
    campo2: '',
    campo3: ''
  }
  
  cambiar_pass(){
    if (this.pass.campo1 == this.servicio.obtener_user_local().pass){
      if(this.pass.campo2 == this.pass.campo3)
      {
        let datos: any = {         
          id_usuario: this.servicio.obtener_user_local().id_usuario,
          pass_new: this.pass.campo3
        }
        this.servicio.actualizar_contraseña(datos).subscribe((result: any) => {
          if (result['mensaje'] == "YES"){
            let datos: any = this.servicio.obtener_user_local()
            datos.pass = this.pass.campo3
            this.servicio.guardar_sesion_local(datos);
            alert('Contraseña actualizada correctamente.')
          }else{
            alert(result['mensaje'])
          }
          this.ajustes_pagina();
        });
        
      }
      else
      {
        alert('Las contraseñas no coinciden.')
      }
    }
    else
    {
      alert('Contraseña actual incorrecta.')
    }
  }

  validarCampos(): boolean {
    return this.pass.campo1.trim() !== '' &&
           this.pass.campo2.trim() !== '' &&
           this.pass.campo3.trim() !== '';
  }
  //--------Rutas--------//
  ajustes_pagina()
  {
    this.ruta.navigate(['/pagina-ajustes/']);
  }
  //--------Rutas--------//
}
