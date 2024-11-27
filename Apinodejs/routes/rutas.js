//--- Rutas de acceso a nuestra API y sus métdos CRUD
const route = require("express").Router();
const rutacliente =  require("../controller/usuarioController.js");
// Routes​
route.use("/", rutacliente);
module.exports=route;