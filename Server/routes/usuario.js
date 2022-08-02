const express = require("express");
const Usuariomodel = require("../models/Usuario.model");
const router = express.Router();


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
    let body = req.body;
    Usuariomodel.findByIdAndUpdate({ _id: "62e9a3626d78cc05c037faa1" }, {
            //ID DE PRUEBA CONECTADO A BD "62e9a3626d78cc05c037faa1"
            $set: req.body
        },{new: true},
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el registro del usuario',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Se ha modificado el usuario correctamente',
                    info: info
                })
            }
        }
    )
});


router.delete('/usuario', (req, res) => {
    Usuariomodel.findByIdAndRemove({ _id: "" },{new: true},
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el usuario',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Se ha eliminado el usuario correctamente'
                })
            }
        }
    )
});




module.exports = router;