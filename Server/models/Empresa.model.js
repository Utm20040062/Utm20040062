const mongoose = require("mongoose");
const parseId= (id) => {return mongoose.Types.ObjectId(id)}

const CategoriasSchema = mongoose.Schema({
    strNombre:{
        type:String,
        required: [true, "Es necesario ingresar tu Nombre"]
    },
    strRazonsocial:{
        type:String,
        required: [true, "Es necesario ingresar tu Razon social"]
    }
})


module.exports = mongoose.model("Empresa", CategoriasSchema);