const conexion = require('../config/conexion');
const cors = require('cors');
const express = require("express");

//-------- Fecha --------//
function ObtenerHora(cadena)
{   
    let fechaActual = new Date();
    let hora = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();
    let segundos = fechaActual.getSeconds();
    console.log("[" + hora + ":" + minutos + ":" + segundos + "]: " + cadena)
}
//-------- Fecha --------//

const ruta = express();
ruta.use(cors());

// para capturar los parametros​
const bodyParser = require('body-parser');
ruta.use(bodyParser.json())  

ruta.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

//--------- verificar usuario, contraseña ---------//
ruta.post('/login-usuario/', async function(req, res)
{
    let pass = req.body.pass;
    try {
        let get_user = await ObtenerUsuario(req.body.usuario); 
        
        if(pass == get_user[0].contraseña){
            //Credenciales válidas
            res.json(get_user);
        } else {
            res.json(get_user);
        }
    } catch (error) {     
        console.error('Error en el servidor.');
    } 
    ObtenerHora('Consulta ejecutada correctamente. --- /login-usuario/');   
})
//--------- verificar usuario, contraseña ---------//


//--------- obtener usuario por id ---------//
function ObtenerUsuario(user) {  
    return new Promise((resolve, reject) => 
    {
        try {
            let sql="select * from cuentas_usuarios where usuario = '" + user + "'";
            conexion.query(sql,(err,results)=>{
                if(err){
                    console.error('Error SQL:', err);
                    reject('Error en el servidor.');
                } else if (results.length === 0){         
                    resolve(null);
                } else {
                    resolve(results); 
                }      
            })
        } catch (error) {
            console.error(error);
            reject('Error en el servidor.');
        }  
    })    
}
//--------- obtener usuario por id ---------//


//--------- guardar un usuarios en BD ---------//
ruta.post('/guardar-usuario/', async function(req,res){
    try {
        let consulta = await ObtenerUsuario(req.body.usuario);
        if (consulta === null)
        {   
            let sql = "insert into cuentas_usuarios set ?"
            let datos_usuario = {
                usuario: req.body.usuario,
                contraseña: req.body.pass,
                nombres : req.body.nombres,
                apellidos: req.body.apellidos,
                telefono: req.body.telefono,
                correo: req.body.correo
            }
                
            conexion.query(sql, datos_usuario, function (error, results)
            {
                if (error) throw error;
                if (results.affectedRows)
                {
                    res.json({ mensaje: 'TRUE'})
                } else res.json({ mensaje: 'NT'})          
            });
        } 
        else 
        {
            res.json({ mensaje: 'FALSE'})
        }
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'NT' });
    }
    ObtenerHora('Consulta ejecutada correctamente. --- /guardar-usuario/');      
});
//--------- guardar un usuarios en BD ---------//

async function  formatearFechaHora(fecha) {
    const anio = fecha.getFullYear();
    const mes = agregarCeroAlInicio(fecha.getMonth() + 1);
    const dia = agregarCeroAlInicio(fecha.getDate());
    const horas = agregarCeroAlInicio(fecha.getHours());
    const minutos = agregarCeroAlInicio(fecha.getMinutes());
    const segundos = agregarCeroAlInicio(fecha.getSeconds());

    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

function agregarCeroAlInicio(valor) {
    return valor < 10 ? `0${valor}` : valor;
}

//--------- agregar evento ---------//
ruta.post('/guardar-evento/', async function(req,res){   

    let sql = "insert into eventos_creados set ?"
    const fecha = new Date(req.body.evento_fecha_ini);
    const fecha2 = new Date(req.body.evento_fecha_fini);
    let datos_evento = {
        nombre: req.body.evento_nombre,
        descripcion : req.body.evento_descrip,
        estado: req.body.evento_estado,
        fecha_inicio: await formatearFechaHora(fecha),
        fecha_finalizacion: await formatearFechaHora(fecha2)
    }
    try {
        conexion.query(sql, datos_evento, function (error, results)
        {
            if (error) throw error;
            if (results.affectedRows)
            {
                let sql = "insert into eventos_me set ?";
                let link_evento = {
                    cuentas_usuarios_idcuentas_usuarios: req.body.usuario,
                    eventos_creados_ideventos_creados: results.insertId
                }

                conexion.query(sql, link_evento, function (error, results)
                {          
                    if (error) throw error;
                    if (results.affectedRows)
                    {
                        res.json({ mensaje: 'TRUE'})
                    }
                });
            }        
        });
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'NT' });
    }
    ObtenerHora('Consulta ejecutada correctamente. --- /guardar-evento/');      
});
//--------- agregar evento ---------//


//--------- Listar todos los eventos disponibles y los que no estás unidos---------//
ruta.get('/listar-eventos-disponibles/:id', async function(req, res){
    
    let sql = "SELECT eventos_creados.* FROM eventos_creados LEFT JOIN eventos_unidos ON eventos_unidos.eventos_creados_ideventos_creados = eventos_creados.ideventos_creados AND eventos_unidos.cuentas_usuarios_idcuentas_usuarios =" + [req.params.id] + " WHERE (eventos_unidos.ideventos_unidos IS NULL OR eventos_unidos.estado = 'F') and eventos_creados.estado <> 'C'";
    conexion.query(sql, function (error, results) 
    {          
        if (error) throw error;
        else
        {   
            res.json(results)
        }
    });
    ObtenerHora('Consulta ejecutada correctamente. --- /listar-eventos-disponibles/'); 
});
//--------- Listar todos los eventos disponibles y los que no estás unidos---------//


//--------- Listar todos los eventos creados por un usuario ---------//
ruta.get('/listar-eventos-creados/:id', function(req, res){
    
    let sql = "select eventos_creados.* from eventos_creados inner join eventos_me on eventos_creados_ideventos_creados = ideventos_creados where cuentas_usuarios_idcuentas_usuarios = " + [req.params.id] + " and eventos_creados.estado = 'D'";
    conexion.query(sql, function (error, results)
    {          
        if (error) throw error;
        else
        {
            res.json(results)
        }
    });
    ObtenerHora('Consulta ejecutada correctamente. --- /listar-eventos-creados/'); 
});
//--------- Listar todos los eventos creados por un usuario ---------//


//--------- Listar todos los eventos disponibles unidos de un usuario ---------//
ruta.get('/listar-eventos-unidos-disponibles/:id', function(req, res){ 
    let sql = "select eventos_creados.* from eventos_creados inner join eventos_unidos on eventos_creados_ideventos_creados = ideventos_creados where cuentas_usuarios_idcuentas_usuarios = " + [req.params.id] + " and eventos_creados.estado = 'D' and eventos_unidos.estado = 'T'";
    conexion.query(sql, function (error, results)
    {          
        if (error) throw error;
        else
        {
            res.json(results)
        }
    });
    ObtenerHora('Consulta ejecutada correctamente. --- /listar-eventos-unidos-disponibles/'); 
});
//--------- Listar todos los eventos disponibles unidos de un usuario ---------//


//--------- Listar todos los eventos finalizados unidos de un usuario ---------//
ruta.get('/listar-eventos-unidos-finalizados-usuario/:id', function(req, res){
    
    let sql = "select ideventos_creados,nombre, descripcion, , portada_img, fecha_inicio, fecha_finalizacion,  from eventos_creados inner join eventos_unidos on eventos_creados_ideventos_creados = ideventos_creados where cuentas_usuarios_idcuentas_usuarios = " + [req.params.id_usuario] + " and eventos_creados.estado = C";
    conexion.query(sql, function (error, results)
    {          
        if (error) throw error;
        else
        {
            res.json(results)
        }
    });
    ObtenerHora('Consulta ejecutada correctamente. --- /listar-eventos-unidos-finalizados-usuario/'); 
});
//--------- Listar todos los eventos finalizados unidos de un usuario ---------//


//------------------- cancelar evento creado -------------------//
ruta.post('/cancelar-evento/:id',function(req,res){
    let sql = "update eventos_creados set estado = 'C' where ideventos_creados = " + [req.params.id];
    conexion.query(sql, function (error, results) {
        if (error) throw error;
        if (results.affectedRows) {
            res.json({mensaje: 'Evento cancelado'})
        }
        else
        {
            res.json({mensaje: 'No se pudo actualizar'})
        }       
    });
});
ObtenerHora('Consulta ejecutada correctamente. --- /cancelar-evento/'); 
//------------------- cancelar evento creado -------------------//


//------------------- cancelar evento asistencia -------------------//
ruta.post('/cancelar-asistencia_evento/',function(req,res){
    let sql = "update eventos_unidos set estado = 'F' where eventos_creados_ideventos_creados = " + req.body.id_evento + " and cuentas_usuarios_idcuentas_usuarios = " + req.body.id_usuario;
    console.log(req.body);
    conexion.query(sql, function (error, results) {
        if (error) throw error;
        if (results.affectedRows) {
            res.json({mensaje: 'Asistencia cancelada'})
        }
        else
        {
            res.json({mensaje: 'No se pudo actualizar'})
        }       
    });
});
ObtenerHora('Consulta ejecutada correctamente. --- /cancelar-asistencia_evento/'); 
//------------------- cancelar evento asistencia -------------------//


//------------------- Obtener datos evento -------------------//
function ObtenerEvento(id_evento) {  
    return new Promise((resolve, reject) => 
    {
        try {
            let sql = "select * from eventos_creados where ideventos_creados = " + id_evento;
            conexion.query(sql,(err,results)=>{
                if(err){
                    console.error('Error SQL:', err);
                    reject('Error en el servidor.');
                } else if (results.length === 0){         
                    resolve(null);
                } else {
                    resolve(results); 
                }      
            })
        } catch (error) {
            console.error(error);
            reject('Error en el servidor.');
        }  
    })    
}
//------------------- Obtener datos evento -------------------//

//------------------- Obtener datos evento -------------------//
function ObtenerLinkEvento(datos) {  
    return new Promise((resolve, reject) => 
    {
        try {
            let sql = "select * from eventos_unidos where eventos_creados_ideventos_creados = " + datos.id_evento + " and cuentas_usuarios_idcuentas_usuarios = " + datos.id_usuario;
            conexion.query(sql,(err,results)=>{
                if(err){
                    console.error('Error SQL:', err);
                    reject('Error en el servidor.');
                } else if (results.length === 0){         
                    resolve(null);
                } else {
                    resolve(results); 
                }      
            })
        } catch (error) {
            console.error(error);
            reject('Error en el servidor.');
        }  
    })    
}
//------------------- Obtener datos evento -------------------//


//------------------- Obtener datos usuario -------------------//
ruta.get('/datos-usuario/:id', async function(req){
    return get_user = await ObtenerUsuario(req.body.usuario); 
});
//------------------- Obtener datos usuario -------------------//


//------------------- Unirse a un evento -------------------//
ruta.post('/unirse-evento/', async function(req,res){   
    try { 
        let consulta = await ObtenerLinkEvento(req.body);
        let sql;
        if (consulta == null)
        {
            sql = "insert into eventos_unidos (cuentas_usuarios_idcuentas_usuarios, eventos_creados_ideventos_creados, estado) values(" + req.body.id_usuario + "," + req.body.id_evento + "," + "'T')";
        }
        else
        {
            sql = "update eventos_unidos set estado = 'T' where cuentas_usuarios_idcuentas_usuarios = " + req.body.id_usuario + " and eventos_creados_ideventos_creados = " + req.body.id_evento;
        }
        
        conexion.query(sql, function (error, results)
        {
            if (error) throw error;
            if (results.affectedRows)
            {
                console.log(results)
                res.json({ mensaje: 'Te uniste al evento.' });
            }      
        });
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'NT' });
    }
    
    ObtenerHora('Consulta ejecutada correctamente. --- /unirse-evento/');      
});
//------------------- Unirse a un evento -------------------//


//-------------------- Obtener evento --------------------//
ruta.get('/evento-creado/:id', async function(req, res){
    
    res.json(await ObtenerEvento([req.params.id][0]));
    ObtenerHora('Consulta ejecutada correctamente. --- /evento-creado/'); 
});
//-------------------- Obtener evento --------------------//


//------------------- Actualizar usuario -------------------//
ruta.post('/actualizar-usuario/',function(req,res){
    let sql = "update cuentas_usuarios set nombres= ?,apellidos = ?, telefono = ?,correo= ? where idcuentas_usuarios = ?"
    conexion.query(sql, [req.body.nombres,req.body.apellidos,req.body.telefono,req.body.correo,req.body.id_usuario], function (error, results) {
        if (error) throw error;
        if (results.affectedRows) {
            res.json({mensaje: 'Registro actualizado'})
        }
        else
        {
            res.json({mensaje: 'No se pudo actualizar'})
        }       
    });
    ObtenerHora('Consulta ejecutada correctamente. --- /actualizar-usuario/'); 
});
//------------------- Actualizar usuario -------------------//


//------------------- Actualizar contraseña -------------------//
ruta.post('/actualizar-pass/',function(req,res){
    let sql = "update cuentas_usuarios set contraseña = " + req.body.pass_new + " where idcuentas_usuarios = " + req.body.id_usuario
    conexion.query(sql, function (error, results) {
        if (error) throw error;
        if (results.affectedRows) {
            res.json({mensaje: 'YES'})
        }
        else
        {
            res.json({mensaje: 'No se pudo cambiar la contraseña.'})
        }       
    });
});
ObtenerHora('Consulta ejecutada correctamente. --- /actualizar-pass/'); 
//------------------- Actualizar contraseña -------------------//


module.exports = ruta;