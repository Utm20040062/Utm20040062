const express = require("express");
const app = express();
const usuario = require("./usuario");
const Puesto = require("./Puesto");
const Empresa = require ("./Empresa");


app.use("/usuario",usuario); // http://localhost:3000/usuario
app.use("/puesto",Puesto); // http://localhost:3000/Categorias
app.use("/empresa",Empresa); //http://localhost:3000/Empresa

module.exports = app;