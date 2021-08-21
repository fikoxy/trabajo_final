const express = require('express');
const app = express();

app.use(require('../controllers/productos/producto.routes'))
app.use(require('../controllers/categorias/categoria.routes'))
var UsuariosController = require('../controllers/usuarios');
 
var api = express.Router();
 
api.get('/usuarios', UsuariosController.obtenerUsuarios);
api.post('/usuarios', UsuariosController.agregarUsuario);
api.delete('/usuarios/:usuario', UsuariosController.eliminarUsuario);
api.post('/login', UsuariosController.accesoUsuario);

module.exports = app;
module.exports = api;