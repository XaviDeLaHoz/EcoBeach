import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { PaginaInicioComponent } from './component/pagina-inicio/pagina-inicio.component';
import { LoginPaginaComponent } from './component/login-pagina/login-pagina.component';
import { BienvenidaPaginaComponent } from './component/bienvenida-pagina/bienvenida-pagina.component';
import { CrearEventoPaginaComponent } from './component/crear.evento-pagina/crear.evento-pagina.component';
import { EventosCreadosPaginaComponent } from './component/eventos-creados-pagina/eventos-creados-pagina.component';
import { EventosUnidosPaginaComponent } from './component/eventos-unidos-pagina/eventos-unidos-pagina.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AjustesPaginaComponent } from './component/ajustes-pagina/ajustes-pagina.component';
import { DatosEventoComponent } from './component/datos-evento/datos-evento.component';
import { CambioPassPaginaComponent } from './component/cambio.pass-pagina/cambio.pass-pagina.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaInicioComponent,
    LoginPaginaComponent,
    BienvenidaPaginaComponent,
    CrearEventoPaginaComponent,
    EventosCreadosPaginaComponent,
    EventosUnidosPaginaComponent,
    NavbarComponent,
    AjustesPaginaComponent,
    DatosEventoComponent,
    CambioPassPaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
