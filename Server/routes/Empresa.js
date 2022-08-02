const express = require("express");
const EmpresaModel = require("../models/Empresa.model");
const router = express.Router();


//METODO POST CON BODY PARSER
router.post('/Empresabody', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const Empresa = new EmpresaModel(req.body);
    Empresa.save()
    .then((EmpresaRegistrda) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                maestro: EmpresaRegistrda
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


router.get("/Empresa", (request, response) => {
   
   
     const registro =  EmpresaModel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla Empresa exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de los Maestros.",
                status: 500,
                cont: {
                    error: err
                }
            });
    });

});


router.put('/Empresa', (req, res) => {
    let body = req.body;
    EmpresaModel.findByIdAndUpdate({ _id: "62d58d06a6cbfaa685390187" }, {
            //ID DE PRUEBA CONECTADO A BD "62d58d06a6cbfaa685390187"
            $set: req.body
        },{new: true},
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el registro del Maestro',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Se ha modificado el maestro correctamente',
                    info: info
                })
            }
        }
    )
});


router.delete('/Empresa', (req, res) => {
    EmpresaModel.findByIdAndRemove({ _id: "" },{new: true},
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