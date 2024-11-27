import { Component} from '@angular/core';
import { Router } from '@angular/router';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent{

  menu_check: boolean = false;
  datos_user_temp: any;
  img: any;
  menuDesplegado: boolean = false;


  constructor(private servicio:UsuarioService, private ruta:Router){}

  verificar_sesion(): boolean
  {
    let datos_temp = this.servicio.obtener_user_local();
    if (datos_temp)
    {
      this.datos_user_temp = datos_temp;
      return true;
    }
    
    return false;
  }


  cerrar_sesion()
  {
    if (this.servicio.obtener_user_local()){
      this.servicio.cerrar_sesion();
      alert('Sesión cerrada correctamente.');
      this.inicio_pagina();  
    }
    else
    {
      alert('Ha ocurrido un error inesperado.');
    } 
  }

  urlimg(){
  
    return this.servicio.obtener_user_local().urlimage;
  }

  //--------Rutas--------//
    inicio_pagina()
    {
      this.menu_check = false;
      this.ruta.navigate(['/pagina-inicio/']);
    }

    bienvenida_pagina()
    {
      this.menu_check = false;
      this.ruta.navigate(['/pagina-bienvenida/']);
    }

    crear_evento_pagina()
    {
      this.menu_check = false;
      this.ruta.navigate(['/pagina-crear.evento/']);
    }

    eventos_creados_pagina()
    {
      this.menu_check = false;
      this.ruta.navigate(['/pagina-eventos.creados/']);
    }

    eventos_unidos_pagina()
    {
      this.menu_check = false;
      this.ruta.navigate(['/pagina-eventos.unidos/']);
    }
    
    ajustes_pagina()
    {
      this.menu_check = false;
      this.ruta.navigate(['/pagina-ajustes/']);
    }

    
  //--------Rutas--------//
  
}
