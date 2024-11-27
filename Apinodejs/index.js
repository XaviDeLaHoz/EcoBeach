

const express = require("express");
const app = express();
//nos ayuda a analizar el cuerpo de la solicitud POST​
app.use(express.json());//para recibir en fortmato json
app.use(express.urlencoded({extended: true}));//?
//-- para dar accesos desde cualquier servidor​
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
//cargamos el archivo del controlador​
app.use(require('./routes/rutas.js'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3300");
    console.log("Ejecute el navegador en la siguiente diección, http://localhost:3300/");
});
module.exports = app;