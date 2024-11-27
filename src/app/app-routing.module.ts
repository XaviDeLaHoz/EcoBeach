import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { PaginaInicioComponent } from './component/pagina-inicio/pagina-inicio.component';
import { LoginPaginaComponent } from './component/login-pagina/login-pagina.component';
import { BienvenidaPaginaComponent } from './component/bienvenida-pagina/bienvenida-pagina.component';
import { CrearEventoPaginaComponent } from './component/crear.evento-pagina/crear.evento-pagina.component';
import { EventosCreadosPaginaComponent } from './component/eventos-creados-pagina/eventos-creados-pagina.component';
import { EventosUnidosPaginaComponent } from './component/eventos-unidos-pagina/eventos-unidos-pagina.component';
import { AjustesPaginaComponent } from './component/ajustes-pagina/ajustes-pagina.component';
import { DatosEventoComponent } from './component/datos-evento/datos-evento.component';
import { CambioPassPaginaComponent } from './component/cambio.pass-pagina/cambio.pass-pagina.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'pagina-inicio'},
  {path:'pagina-inicio',component:PaginaInicioComponent},
  {path:'pagina-login',component:LoginPaginaComponent},
  {path:'pagina-bienvenida',component:BienvenidaPaginaComponent},
  {path:'pagina-crear.evento',component:CrearEventoPaginaComponent},
  {path:'pagina-eventos.creados',component:EventosCreadosPaginaComponent},
  {path:'pagina-eventos.unidos',component:EventosUnidosPaginaComponent},
  {path:'pagina-ajustes',component:AjustesPaginaComponent},
  {path:'pagina-datos.eventos/:id_evento/:tipo_evento',component:DatosEventoComponent},
  {path:'pagina-cambio.pass',component:CambioPassPaginaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
