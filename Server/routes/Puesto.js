const express = require("express");
const { model, default: mongoose } = require("mongoose");
const Puestomodel = require("../models/Puesto.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}

//METODO POST CON BODY PARSER
router.post('/', (req, response) => {

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
//Parametros Especificos
router.get("/:id", (req, res) => {
    const{id} = req.params
   const body = req.body
   Puestomodel.findOne(
    {id: parseId(req.params.id)},
    body,
    (err, docs)=>{
        res.send({
            items : docs
        })
    }
   )
});

router.get("/", (request, response) => {
   
   
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


router.put('/', (req, res) => {
    const{id} = req.params
    const body = req.body
    Puestomodel.updateOne(
     {id: parseId(req.params.id)},
     body,
     (err, docs)=>{
         res.send({
             items : docs
         })
     }
    )
});


router.delete('/', (req, res) => {
    const{id} = req.params
    Puestomodel.deleteOne(
     {id: parseId(req.params.id)},
     (err, docs)=>{
         res.send({
             items : docs
         })
     }
    )
});




module.exports = router;