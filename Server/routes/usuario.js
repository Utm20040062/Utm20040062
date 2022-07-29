const { request, response } = require("express");
const express = require("express");
const UsuarioModel = require("../models/Usuario.model");
const router = express.Router();
const Email = require ('../libraries/email');

router.get("/",(request,response) => {
    
    UsuarioModel.find()

    response.status(200).json({
        "message" : "Estas dentro de la api GET Usuario"
    });
})
router.post("/usuario",(request,response) => {
    
    const usuario= new UsuarioModel(request.body);

    usuario.save()
    
    .then((usuarioRegistrado) => {
        response.status(200).json({
            msg : "Usuario registrado ",
            status:200,
            cont: {
                usuario: usuarioRegistrado
            }
        });
    })
    .catch(()=>{
        response.status(500).json({
            msg : "Error de Registro ",
            status:500,
        });
    })
});
router.put("/api/usario",(request,response) => {
    
    response.status(200).json({
        "message" : "Estas dentro de la api PUT Usuario"
    });
})
router.delete("/api/usario",(request,response) => {
    
    response.status(200).json({
        "message" : "Estas dentro de la api DELETE Usuario"
    });
})

router.post("/EnviarEmail",(request,resp)=> {
        
        const strCorreo = request.body.strCorreo;
        Email.sendEmail(strCorreo, {})
        .then((response)=>{
            return resp.status(200).json({
                msg : "Se ha enviado exitosamente",
                status : 200,
                cont: {
                    response
                }
            })
        })
        .catch((error)=>{
            return resp.status(500).json({
                msg : "No se envio correctamente",
                status : 500,
                cont :{
                    error
                }
            })
        })
    })

module.exports = router;