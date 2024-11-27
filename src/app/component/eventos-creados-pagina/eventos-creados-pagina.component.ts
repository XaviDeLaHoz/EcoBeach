import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


//service
import { UsuarioService } from 'src/app/service/usuario-service.service';


@Component({
  selector: 'app-eventos-creados-pagina',
  templateUrl: './eventos-creados-pagina.component.html',
  styleUrls: ['./eventos-creados-pagina.component.css']
})
export class EventosCreadosPaginaComponent implements OnInit {
  datos_evento: any;
  eventoSeleccionado: any;
  constructor(private servicio: UsuarioService, private ruta: Router) { }
  ngOnInit(): void {
    this.Listar_eventos_creados();
  }

  Listar_eventos_creados() {
    return this.servicio.Listar_eventos_creados().subscribe((result: any) => {
      this.datos_evento = result;
    });
  }


  //--------Rutas--------//
  datos_evento_pagina(id_evento: number) {
    this.ruta.navigate(['/pagina-datos.eventos/' + id_evento, 'C']);
  }

  generarInformePDF() {
    if (this.datos_evento && this.datos_evento.length > 0) {
    const doc = new jsPDF();
    

    // Personalizar el título para eventos disponibles
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text('Ecobeach-Agenda eventos disponibles', 10, 10);
    const logoUrl = 'assets/playa.png';

    // Tamaño del logo
    const logoWidth = 10;  // Ajusta según tus necesidades
    const logoHeight = 10;  // Ajusta según tus necesidades

    // Añadir el logo al lado del texto
    doc.addImage(logoUrl, 'PNG', 100, 10, logoWidth, logoHeight);  // Ajusta las coordenadas según tus necesidades
    // Título centrado
    doc.setFontSize(16);
    doc.text('Eventos creados por ti', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });


    const headers = ['Nombre del Evento', 'Ubicación', 'Fecha y hora de inicio', 'Fecha y hora de finalización', 'Estado'];

    const data = this.datos_evento.map((evento: any) => [
      evento.nombre || 'N/A',
      evento.descripcion || 'N/A',
      evento.fecha_inicio || 'N/A',
      evento.fecha_finalizacion || 'N/A',
      evento.estado || 'N/A'
    ]);

    // Añade bordes y estilos a la tabla de eventos disponibles
    (doc as any).autoTable({
      head: [headers],
      body: data,
      startY: 40,
      theme: 'grid',
      styles: { lineWidth: 0.5, lineColor: [0, 0, 0] }
    });

    doc.setFontSize(12);
    doc.text('Estado: "D" (Disponible)', doc.internal.pageSize.getWidth() / 10, (doc as any).autoTable.previous.finalY + 10, { align: 'left' });

    doc.setFillColor(0, 255, 0); // RGB para verde
    doc.rect(doc.internal.pageSize.getWidth() / 10 + 50, (doc as any).autoTable.previous.finalY + 5, 8, 8, 'F');
  

    
    // Guarda el PDF con un nombre específico
    doc.save('Mis_eventos_creados.pdf');
    } else {
      // No hay eventos disponibles, muestra un mensaje
      alert('No has creado ningún evento.');
  }
}


  //--------Rutas--------//

}
