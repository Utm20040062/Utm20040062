const express = require("express");
const { model, default: mongoose } = require("mongoose");
const Puestomodel = require("../models/Puesto.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}

//METODO POST CON BODY PARSER
router.post('/body', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const Puesto= new Puestomodel(req.body);
    Puesto.save()
    .then((PuestoRegistrdo) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                Puesto: PuestoRegistrdo
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
    let id = req.params.id
    Puestomodel.findById(id, (err, Puestomodel)=>{
       if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
       if (!Puestomodel) return res.status(404).send({message: 'El usuario no existe'})
   
       res.status(200).send({Puestomodel})
   }) 
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
    let id = req.params.id
    let update = req.body
    Puestomodel.findByIdAndUpdate(id,update,(err, puestoupdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el usuario: $'})
        res.status(200).send({Puestomodel: puestoupdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    Puestomodel.findByIdAndDelete(id, (err, Puestomodel)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!Puestomodel) return res.status(404).send({message: 'El usuario no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});




module.exports = router;