import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//model
import { UsuarioModel } from 'src/app/model/usuario';
import { UsuarioCuenta } from 'src/app/model/usuario';
import { UsuarioEvento } from 'src/app/model/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //---------- obtener-iniciar-cerrar sesión local ----------//
  guardar_sesion_local(datos: UsuarioCuenta): void {
    localStorage.setItem('sesion', JSON.stringify(datos));
  }

  obtener_user_local(): any {
    const sesionGuardada = localStorage.getItem('sesion');
    if (sesionGuardada) {
      const usuario: UsuarioCuenta = JSON.parse(sesionGuardada);
      return usuario;
    } else {
      return null;
    }
  }

  iniciar_sesion(reg: UsuarioCuenta): any {
    return this.http.post(this.API_URL + '/login-usuario/', reg);
  }

  cerrar_sesion(): void {
    localStorage.removeItem('sesion');
  }
  //---------- obtener-iniciar-cerrar sesión local ----------//


  //-------Registrarse------//
  RegistrarUsuario(reg: UsuarioModel) {
    return this.http.post(this.API_URL + '/guardar-usuario/', reg);
  }
  //-------Registrarse------//


  //------- Obtener datos usuario -------//
  Datos_usuario() {
    return this.http.get(this.API_URL + '/datos-usuario/', this.obtener_user_local().id);
  }
  //------- Obtener datos usuario -------//


  //-------Agregar Evento-------//
  AgregarEvento(reg: UsuarioEvento) {
    return this.http.post(this.API_URL + '/guardar-evento/', reg);
  }
  //-------Agregar Evento-------//


  //-------Listar eventos disponibles-------//
  Listar_eventos_disponibles() {
    return this.http.get(this.API_URL + '/listar-eventos-disponibles/' + this.obtener_user_local().id_usuario);
  }
  //-------Listar eventos disponibles-------//


  //-------Listar eventos creados por un usuario-------//
  Listar_eventos_creados() {
    return this.http.get(this.API_URL + '/listar-eventos-creados/' + this.obtener_user_local().id_usuario);
  }
  //-------Listar eventos creados por un usuario-------//


  //-------Listar eventos unidos por un usuario-------//
  Listar_eventos_unidos_disponibles() {
    return this.http.get(this.API_URL + '/listar-eventos-unidos-disponibles/' + this.obtener_user_local().id_usuario);
  }
  //-------Listar eventos unidos por un usuario-------//


  //-------------------- Obtener evento --------------------//
  Evento_disponible(id: number) {
    return this.http.get(this.API_URL + '/evento-creado/' + id);
  }
  //-------------------- Obtener evento --------------------//


  //-------------------- Unirse evento --------------------//
  Unirse_evento(id_evento: number) {
    let datos = {
      id_usuario: this.obtener_user_local().id_usuario,
      id_evento: id_evento
    }
    return this.http.post(this.API_URL + '/unirse-evento/', datos);
  }
  //-------------------- Unirse evento --------------------//


  //-------------------- Cancelar evento --------------------//
  Cancelar_evento(id_evento: number) {
    return this.http.post(this.API_URL + '/cancelar-evento/' + id_evento, {});
  }
  //-------------------- Cancelar evento --------------------//


  //-------------------- Cancelar asistencia evento --------------------//
  Cancelar_asistencia_evento(id_evento: number) {
    let datos = {
      id_usuario: this.obtener_user_local().id_usuario,
      id_evento: id_evento
    }
    return this.http.post(this.API_URL + '/cancelar-asistencia_evento/', datos);
  }
  //-------------------- Cancelar asistencia evento --------------------//


  //-----------------Actualizar usuario-----------------//
  Actualizar_usuario(datos: UsuarioCuenta) {
    return this.http.post(this.API_URL + '/actualizar-usuario/', datos);
  }
  //-----------------Actualizar usuario-----------------//


  //-----------------Actualizar contrasñea-----------------//
  actualizar_contraseña(id_usuario: any) {
    return this.http.post(this.API_URL + '/actualizar-pass/', id_usuario);
  }



  //-------BLOB to image.*-------//


  //-------BLOB to image.*-------//

}
