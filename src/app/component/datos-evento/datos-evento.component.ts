import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';


@Component({
  selector: 'app-datos-evento',
  templateUrl: './datos-evento.component.html',
  styleUrls: ['./datos-evento.component.css']
})
export class DatosEventoComponent {
  dato_evento: any;
  tipo_evento: string = '';
  id_evento: number = -1;
  datos_open: any;
  fecha_ini: any;
  fecha_fini: any;

  constructor(private servicio:UsuarioService,private ruta:Router, private activaterouter:ActivatedRoute){}

  ngOnInit(): void 
  {
    this.activaterouter.params.subscribe(params => {
      this.id_evento = params['id_evento'];
      this.tipo_evento = params['tipo_evento'];
    });

    if (this.servicio.obtener_user_local() != null)
    {
      this.Evento_datos();   
    } 
    else
    {
      this.login_pagina();
    } 
    //this.blobToimgae();
  } 

  unirse_evento()
  {
    return this.servicio.Unirse_evento(this.id_evento).subscribe(
      (datos:any) =>{
        if(datos['mensaje'])
        {
        alert(datos['mensaje']);
        this.bienvenida_pagina();
        }    
      },
      (error) => {console.log('Ocurrió un error ',error)}
    )
  }

  cancelar_evento()
  {
    return this.servicio.Cancelar_evento(this.id_evento).subscribe(
      (datos:any) =>{
        if(datos['mensaje'])
        {
        alert(datos['mensaje']);
        this.bienvenida_pagina();
        }    
      },
      (error) => {console.log('Ocurrió un error ',error)}
    )
  }

  cancelar_asistencia()
  {
    return this.servicio.Cancelar_asistencia_evento(this.id_evento).subscribe(
      (datos:any) =>{
        
        if(datos['mensaje'])
        {
        alert(datos['mensaje']);
        this.bienvenida_pagina();
        }    
      },
      (error) => {console.log('Ocurrió un error ',error)}
    )
  }

  Evento_datos()
  {
    this.servicio.Evento_disponible(this.id_evento).subscribe(result => {
      this.dato_evento = result;
      const fecha = new Date(this.dato_evento[0].fecha_inicio);
      const fecha2 = new Date(this.dato_evento[0].fecha_finalizacion);
       
      this.fecha_ini =  this.formatearFechaHora(fecha);
      this.fecha_fini = this.formatearFechaHora(fecha2);
      this.datos_open = true;
      
    });
  }

  formatearFechaHora(fecha:any) {
    const anio = fecha.getFullYear();
    const mes = this.agregarCeroAlInicio(fecha.getMonth() + 1);
    const dia = this.agregarCeroAlInicio(fecha.getDate());
    const horas = this.agregarCeroAlInicio(fecha.getHours());
    const minutos = this.agregarCeroAlInicio(fecha.getMinutes());
    const segundos = this.agregarCeroAlInicio(fecha.getSeconds());

    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

agregarCeroAlInicio(valor:any) {
    return valor < 10 ? `0${valor}` : valor;
}

  //--------Rutas--------//
  login_pagina()
  {
    this.ruta.navigate(['/pagina-login/']);
  }

  bienvenida_pagina()
  {
    this.ruta.navigate(['/pagina-bienvenida/']);
  }
  //--------Rutas--------//
}
