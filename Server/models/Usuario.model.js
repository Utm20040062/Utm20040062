const mongoose= require("mongoose");
const parseId= (id) => {return mongoose.Types.ObjectId(id)}

const UsuarioSchema = mongoose.Schema({
    strNombre : {
        type: String,
        required: [true,"Es necesario ingresar el Nombre"]
    },
    strPrimerApellidos :{
        type: String,
        required: [true,"Es necesario ingresar los apellidos"]
    },
    strSegundoApellido:{
        type: String,
        required: [true,"Es necesario ingresar el Segundo Apellido"]
    },
    nmbEdad :Number,

    idPuesto:{
        type: mongoose.Types.ObjectId, 
        required:[true, "descripcion"]
    },

    credenciales: 
        {
            strCorreo : {type: String, required : true , unique: false },
            strPassword : {type: String, required : true, unique: false}
        }
    

})

//62e9a1157c01c733e4109829 id de Puesto
//62e9a0dc7c01c733e410982 id de Empresa
module.exports = mongoose.model("usuario", UsuarioSchema);