import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
//service
import { UsuarioService } from 'src/app/service/usuario-service.service';


@Component({
  selector: 'app-eventos-unidos-pagina',
  templateUrl: './eventos-unidos-pagina.component.html',
  styleUrls: ['./eventos-unidos-pagina.component.css']
})
export class EventosUnidosPaginaComponent implements OnInit {
  datos_evento: any;
  num_col: number;
  arregloRepeticiones: any;
  eventoSeleccionado: any;
  //datos_img: any;

  constructor(private servicio: UsuarioService, private ruta: Router) {

    //columnas
    this.num_col = 3;
    this.arregloRepeticiones = new Array(this.num_col);
  }

  ngOnInit(): void {
    this.Listar_eventos_unidos_disponibles();
    //this.blobToimgae();
  }


  //------------------------Listar Eventos------------------------//
  Listar_eventos_unidos_disponibles() {
    return this.servicio.Listar_eventos_unidos_disponibles().subscribe((result: any) => {
      this.datos_evento = result;
    });
  }

  Listar_eventos_unidos_cancelados(id: number) {
    console.log('soy listar eventos unidos cacelados')
    return this.servicio.Listar_eventos_disponibles().subscribe((result: any) => {
      this.datos_evento = result;
    });
  }
  //------------------------Listar Eventos------------------------//

  //--------Rutas--------//
  datos_evento_pagina(id_evento: number) {
    this.ruta.navigate(['/pagina-datos.eventos/' + id_evento, 'U']);
  }
  generarInformePDF() {
    if (this.datos_evento && this.datos_evento.length > 0) {
      const doc = new jsPDF();

      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.text('Ecobeach-Agenda eventos donde te uniste', 10, 10);
      const logoUrl = 'assets/playa.png';
      // Tamaño del logo
      const logoWidth = 10;  // Ajusta según tus necesidades
      const logoHeight = 10;  // Ajusta según tus necesidades
      // Añadir el logo al lado del texto
      doc.addImage(logoUrl, 'PNG', 100, 10, logoWidth, logoHeight);  // Ajusta las coordenadas según tus necesidades
      // Título centrado
      doc.setFontSize(16);
      doc.text('Eventos a los que te has unido', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });


      const headers = ['Nombre del Evento', 'Ubicación', 'Fecha y hora de inicio', 'Fecha y hora de finalización', 'Estado'];

      const data = this.datos_evento.map((evento: any) => [
        evento.nombre || 'N/A',
        evento.descripcion || 'N/A',
        evento.fecha_inicio || 'N/A',
        evento.fecha_finalizacion || 'N/A',
        evento.estado || 'N/A'
      ]);

      // Añade bordes y estilos a la tabla de eventos unidos
      (doc as any).autoTable({
        head: [headers],
        body: data,
        startY: 35,
        theme: 'grid',
        styles: { lineWidth: 0.5, lineColor: [0, 0, 0] }
      });

      // Guarda el PDF con un nombre específico
      doc.save('Eventos_unidos.pdf');
    } else {
      // No hay eventos unidos, muestra un mensaje
      alert('No te has unido a ningún evento.');
    }
  }
  //--------Rutas--------//
}
