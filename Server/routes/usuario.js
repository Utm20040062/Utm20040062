const express = require("express");
const { model, default: mongoose } = require("mongoose");
const Usuariomodel = require("../models/Usuario.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}


//METODO POST CON BODY PARSER
router.post('/usuariobody', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const usuario = new Usuariomodel(req.body);
    usuario.save()
    .then((UsuarioRegistrado) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                maestro: UsuarioRegistrado
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el usuario",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});


router.get("/usuario", (request, response) => {
   
   
     const registro =  Usuariomodel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla usuario exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de los usuarios.",
                status: 500,
                cont: {
                    error: err
                }
            });
    });

});


router.put('/usuario', (req, res) => {
   const{id} = req.params
   const body = req.body
   Usuariomodel.updateOne(
    {id: parseId(req.params.id)},
    body,
    (err, docs)=>{
        res.send({
            items : docs
        })
    }
   )
});


router.delete('/usuario', (req, res) => {
    const{id} = req.params
    Usuariomodel.deleteOne(
     {id: parseId(req.params.id)},
     (err, docs)=>{
         res.send({
             items : docs
         })
     }
    )
});




module.exports = router;