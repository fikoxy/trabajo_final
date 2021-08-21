const express = require('express');
const app = express();
const {GetCategorias,NewCategoria,GetCategoria,DeleteCategoria,UpdateCategoria} = require('./categoria');
const { check } = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombreCategoria } = require('../../helpers/ValidacionesDb');
//const { ValidaJWT } = require('../../middlewares/validaJWT')

async function getCategorias(req,res){
    try{
        let respuesta = await GetCategorias();
        if (!respuesta.isEmpty){
            res.status(200).json({message:'Se encontraron registros:', data:respuesta});
        }
        else{
            res.status(500).json({message:'Error listando categorias.'});    
        }
    }
    catch(e){
        res.status(500).json({message:'Error listando categorias.'});
    }
}

async function getCategoria(req,res){
    try{
        let id = req.params.id;
        let respuesta = await GetCategoria(id);
        if (!respuesta.isEmpty){
            res.status(200).json({message:'Se encontro registro:', data:respuesta});
        }
        else{
            res.status(500).json({message:'No se encontró categoria.'});    
        }
    }
    catch(e){
        res.status(500).json({message:'No se encontró categoria.'});
    }
}

async function deleteCategoria(req,res){
    try{
        let id = req.params.id;
        let respuesta = await DeleteCategoria(id);
        if (respuesta.n==0){
            res.status(500).json({message:'No se pudo eliminar registro', data:respuesta});    
        }
        else{
            res.status(200).json({message:'Se elimino registro', data:respuesta});
        }
        
    }
    catch(e){
        res.status(500).json({message:'Error eliminando categoria.'});
    }
}

async function updateCategoria(req,res){
    try{
        let id = req.params.id;
        let categoria = req.body;

        let respuesta = await UpdateCategoria(id,categoria);
        if (!respuesta.isEmpty){
            res.status(200).json({message:'Se actualizo registro', data:respuesta});
        }
        else{
            res.status(500).json({message:'Error actualizando categorias.'});   
        }
    }
    catch(e){
        res.status(500).json({message:'Error actualizando categorias.'});
    }
}

async function newCategoria(req,res){
    try{
        let categoria = req.body;
        let respuesta = await NewCategoria(categoria);
        res.status(200).json({message:'Se creo categoria correctamente', data:respuesta});
    }
    catch(e){
        res.status(500).json({message:'Error creando categoria.'});
    }
}

//GET
app.get("/api/categorias",getCategorias);
app.get("/api/categorias/:id",getCategoria);

//POST
app.post("/api/categorias",[
    //ValidaJWT,
    check('idCategoria','El idCategoria es obligatorio').not().isEmpty(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','Ingrese nombre superior a 3 caracteres').isLength({min:4}),
    check('nombre').custom(existeNombreCategoria),
    validacionesCampos
],newCategoria);

//DELETE
app.delete("/api/categorias/:id",deleteCategoria);

//UPDATE
app.put("/api/categorias/:id",updateCategoria);

module.exports = app;