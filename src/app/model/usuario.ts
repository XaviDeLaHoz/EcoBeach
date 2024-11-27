export interface UsuarioModel{
    usuario: string,
    pass: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    correo: string
};

export interface UsuarioCuenta{
    id_usuario: number,
    usuario: string,
    pass: string, 
    nombres: string | null,
    apellidos: string | null,
    telefono: string,
    correo: string
}

export interface UsuarioEvento{
    usuario: string,
    evento_nombre: string, 
    evento_descrip: string,
    evento_estado: string,
    evento_lugar: string,
    evento_fecha_ini: any,    
    evento_fecha_fini: any
}
