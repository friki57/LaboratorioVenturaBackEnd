import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

import cors from "cors";
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.set('strictQuery', true)
mongoose.connect("mongodb://0.0.0.0:27017/LaboratorioVentura",
{},
(err, res)=>
{
    err && console.log("Error al conectar a la Base de Datos", err);
    !err && console.log("Conexión a la Base de Datos exitosa");
});
import rutas from './Controlador/HTTP/index.js';
app.use(rutas());
app.listen(8080, ()=>
{
    console.log("Servidor iniciado en el puerto 8080");
})