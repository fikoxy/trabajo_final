const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');

 
// OBTENER USUARIOS
exports.obtenerUsuarios = function (req, res) {
  Usuario.find(function (err, call) {
    if(!call.length)
      res.status(500).json({message:'No existen registros'});
    else
      res.status(200).json({message:'Registros existentes', data:call});
  });
};

exports.agregarUsuario = async function (req, res) {
  const requestBody = req.body;
    const newUsuario = new Usuario(requestBody);

    const salt = await bcrypt.genSalt(10);
    newUsuario.clave = await bcrypt.hash(newUsuario.clave, salt);

    newUsuario.save(function (err, success) {

    if (err) return res.status(500).json({message:err.message});
    res.status(200).json({message:'El usuario fue ingresado exitosamente', data:success});
  });
};

exports.eliminarUsuario = function(req, res) {
	Usuario.deleteOne({"usuario":req.params.usuario}, function(err, success) {
		if (success.n == 0){
      res.status(500).json({
        message: `No se puede borrar el usuario ${req.params.usuario}`
      })
    }else{
      res.status(200).json({
        message: `El usuario fue eliminado exitosamente`
      })
    }
    
	});
};

exports.accesoUsuario = async function (req, res) {
    const requestBody = req.body;
    const user = await Usuario.findOne({ usuario: requestBody.usuario });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(requestBody.clave, user.clave);
      if (validPassword) {
        res.status(200).json({ message: "Clave Válida" });
      } else {
        res.status(400).json({ message: "Clave Inválida" });
      }
    } else {
      res.status(401).json({ message: "Usuario no existe" });
    }
};