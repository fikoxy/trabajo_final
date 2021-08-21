const express = require('express');
 
var UsuariosController = require('../controllers/usuarios');
 
var api = express.Router();
 
api.get('/usuarios', UsuariosController.obtenerUsuarios);
api.post('/usuarios', UsuariosController.agregarUsuario);
api.delete('/usuarios/:usuario', UsuariosController.eliminarUsuario);
api.post('/login', UsuariosController.accesoUsuario);
module.exports = api;