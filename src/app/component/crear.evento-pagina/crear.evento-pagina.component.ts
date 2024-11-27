import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';

//model
import { UsuarioEvento } from 'src/app/model/usuario';


@Component({
  selector: 'app-crear.evento-pagina',
  templateUrl: './crear.evento-pagina.component.html',
  styleUrls: ['./crear.evento-pagina.component.css']
})
export class CrearEventoPaginaComponent {
  evento_fecha_ini: string;
  evento_hora_ini: string;
  evento_fecha_fini: string;
  evento_hora_fini: string;

  evento_model: UsuarioEvento = {
    usuario: '',
    evento_nombre: '',
    evento_descrip: '',
    evento_estado: '',
    evento_lugar: '',
    evento_fecha_ini: null,
    evento_fecha_fini: null
  };
  constructor(private servicio: UsuarioService, private ruta: Router) {
    this.evento_fecha_ini = '';
    this.evento_hora_ini = '';
    this.evento_fecha_fini = '';
    this.evento_hora_fini = '';
  }

  AgregarEvento(evento_model_html: any) {
    this.evento_model = evento_model_html;

    //juntar fecha + hora
    const fecha = new Date(this.evento_fecha_ini);
    const hora = this.evento_hora_ini.split(':');
    fecha.setHours(parseInt(hora[0], 10));
    fecha.setMinutes(parseInt(hora[1], 10));
    this.evento_model.evento_fecha_ini = fecha;

    const fecha_fini = new Date(this.evento_fecha_fini);
    const hora_fini = this.evento_hora_fini.split(':');
    fecha_fini.setHours(parseInt(hora_fini[0], 10));
    fecha_fini.setMinutes(parseInt(hora_fini[1], 10));
    this.evento_model.evento_fecha_fini = fecha_fini;

    console.log(fecha)
    console.log(fecha_fini)
    //juntar fecha + hora

    this.evento_model.usuario = this.servicio.obtener_user_local().id_usuario;
    this.evento_model.evento_estado = 'D';
    
    this.servicio.AgregarEvento(this.evento_model).subscribe(
      (res: any) => {
        if (res['mensaje'] == 'TRUE') {
          alert('Evento agregado correctamente.');
          this.Bienvenida_pagina();
        }
        else if (res['mensaje'] == 'FALSE') {
          alert('No se ha podido agregar el evento.');
        }
        else {
          alert('Error en el servidor.');
        }
      },
      (error) => { console.log("Error generado: ", error) }
    );
  }
  //--------Rutas--------//
  Bienvenida_pagina() {
    this.ruta.navigate(['/pagina-bienvenida/']);
  }
  //--------Rutas--------//

}
