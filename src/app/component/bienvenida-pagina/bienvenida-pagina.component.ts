import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

//service
import { UsuarioService } from 'src/app/service/usuario-service.service';


@Component({
  selector: 'app-bienvenida-pagina',
  templateUrl: './bienvenida-pagina.component.html',
  styleUrls: ['./bienvenida-pagina.component.css']
})



export class BienvenidaPaginaComponent implements OnInit{
  datos_evento: any;
  dato_evento_seleccionado: any;
  num_col: number;
  arregloRepeticiones: any;
  datos_img: any;
  showModal = false;
  eventoSeleccionado: any;

  generarInformePDF() {
    const doc = new jsPDF();

    doc.text('Informe de Eventos Creados por el Usuario', 10, 10);

    let yOffset = 30; // Ajusta según tus necesidades

    this.datos_evento.forEach((evento: any) => {
      doc.text(`Nombre del Evento: ${evento.nombre}`, 10, yOffset);
      yOffset += 10; // Espacio entre eventos, ajusta según tus necesidades
    });

    // Guarda el PDF con un nombre específico
    doc.save('informe_eventos_usuario.pdf');
  }
  

  constructor(private servicio:UsuarioService, private ruta:Router)
  {
    //columnas
    this.num_col= 3;
    this.arregloRepeticiones = new Array(this.num_col);
  }

  ngOnInit(): void 
  {
    if (this.servicio.obtener_user_local() != null)
    {
      this.Listar_eventos_disponibles();
    } 
    else
    {
      this.login_pagina();
    } 
    //this.blobToimgae();
  } 


  Listar_eventos_disponibles()
  {
    return this.servicio.Listar_eventos_disponibles().subscribe((result: any) => {
      this.datos_evento=result;
    });
  }

  //--------Rutas--------//
    crear_evento_pagina()
    {
      this.ruta.navigate(['/pagina-crear.evento/']);
    }

    eventos_creados_pagina()
    {
      this.ruta.navigate(['/pagina-eventos.creados/']);
    }

    eventos_unidos_pagina()
    {
      this.ruta.navigate(['/pagina-eventos.unidos/']);
    }

    login_pagina()
    {
      this.ruta.navigate(['/pagina-login/']);
    }

    datos_evento_pagina(id_evento: number)
    {
      this.ruta.navigate(['/pagina-datos.eventos/' + id_evento, 'D']);
    }

    //--------Rutas--------//

}

