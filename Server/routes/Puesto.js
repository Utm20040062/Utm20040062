const express = require("express");
const Puestomodel = require("../models/Puesto.model");
const router = express.Router();


//METODO POST CON BODY PARSER
router.post('/Puestobody', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const Puesto= new Puestomodel(req.body);
    Puesto.save()
    .then((PuestoRegistrdo) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                maestro: PuestoRegistrdo
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el maestro",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});


router.get("/Puesto", (request, response) => {
   
   
     const registro =  Puestomodel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla Puestos exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de los Puestos.",
                status: 500,
                cont: {
                    error: err
                }
            });
    });

});


router.put('/Puesto', (req, res) => {
    let body = req.body;
    Puestomodel.findByIdAndUpdate({ _id: "62d58d06a6cbfaa685390187" }, {
            //ID DE PRUEBA CONECTADO A BD "62d58d06a6cbfaa685390187"
            $set: req.body
        },{new: true},
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el registro del Puesto',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Se ha modificado el Puesto correctamente',
                    info: info
                })
            }
        }
    )
});


router.delete('/Puesto', (req, res) => {
    Puestomodel.findByIdAndRemove({ _id: "" },{new: true},
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo eliminar el Maestro',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Se ha eliminado el Maestro correctamente'
                })
            }
        }
    )
});




module.exports = router;