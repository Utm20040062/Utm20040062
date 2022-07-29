const express = require("express");
const app = express();
const usuario = require("./usuario");
const Categorias = require("./Categorias");


app.use("/usario",usuario); // http://localhost:3000/usuario
app.use("/Categorias",Categorias); // http://localhost:3000/Categorias

module.exports = app;