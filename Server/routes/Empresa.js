const express = require("express");
const { model, default: mongoose } = require("mongoose");
const EmpresaModel = require("../models/Empresa.model");
const PuestoModel = require("../models/Puesto.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}

//METODO POST CON BODY PARSER
router.post('/', (req, response) => {

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

//Parametros Especificos
router.get("/:id", (req, res) => {
    let id = req.params.id
    EmpresaModel.findById(id, (err, EmpresaModel)=>{
       if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
       if (!EmpresaModel) return res.status(404).send({message: 'El usuario no existe'})
   
       res.status(200).send({Usuariomodel})
   }) 
});

router.get("/", (request, response) => {
   
   
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

        
//El metodo put funcion correctamente pero no muestra la actualizasion al instante
//Por lo que debe volver a usar el metodo GET para ver los resultados de la edicion
router.put('/:id', (req, res) => {
    let id = req.params.id
    let update = req.body
    EmpresaModel.findByIdAndUpdate(id,update,(err, empresaupdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el usuario: $'})
        res.status(200).send({EmpresaModel: empresaupdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    EmpresaModel.findByIdAndDelete(id, (err, EmpresaModel)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!EmpresaModel) return res.status(404).send({message: 'La Empresa no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});



module.exports = router;