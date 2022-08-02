const express= require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
require("colors");
require("./config/config");
const routes = require("./routes/index");
const app = express();
const usuario = require("./routes/usuario");
const Empresa = require("./routes/Empresa");
const Puesto = require("./routes/Puesto");
const {response} = require ("express");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use("/api",routes);
app.use(usuario);
app.use(Puesto);
app.use(Empresa);

mongoose.connect(process.env.URLDB,{})
.then(() => {
    console.log("[MONGODB]".green+"DATABASE CONNECTION SUCCESSFULLY");   
    
 })
 .catch((err) => {
    console.log("[MONDODB]".red + "Coneccion fail");
});
app.listen(process.env.PORT, () => {
 console.log("Listen in the PORT: "+ process.env.PORT.green);
});