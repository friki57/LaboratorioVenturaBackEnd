const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const cors = require("cors")
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.set('strictQuery', true)
mongoose.connect("mongodb://0.0.0.0:27017/pilEntrevista",
{},
(err, res)=>
{
    err && console.log("Error al conectar a la Base de Datos", err);
    !err && console.log("Conexión a la Base de Datos exitosa");
    const crud = require("./Controlador/Cruds/crudProduct")
/*     crud.guardar({id:1, product_name:"hola", stock:100, product_image:"osx  "},()=>{
        crud.buscarTodo((products)=>console.log(products))
    }) */
});
var rutas = require('./Controlador/HTTP/index.js');
app.use(rutas());
app.listen(8080, ()=>
{
    console.log("Servidor iniciado en el puerto 8080");
})