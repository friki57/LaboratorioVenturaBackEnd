import mongoose from "mongoose";
import Examen from "../../Modelo/Examen.js";

import crudLaboratorio from "../Cruds/crudLaboratorio.js";


function crud()
{
    this.buscarTodo = (callback)=>
    {
        Examen.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback)=>
    {
        Examen.findOne({ "_id": id }, (err, product) =>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var objeto = new Examen(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.modificar = (id, datosnuevos, callback) => {
        Examen.updateOne({ "_id": id }, datosnuevos, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error modificando en la tabla: " + tabla + "-", error);
            }
        });
    }
    this.eliminar = (id, callback) => {
        Examen.deleteOne({ "_id": id }, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error eliminando en la tabla: " + tabla + "-", error);
            }
        });
    }
    this.verificarUso = (id, callback) => {
        crudLaboratorio.buscarTodo((laboratorios) => {
            let utilizado = 0;
            laboratorios.map(lab => lab.ExamenesRealizados.map(ex => {
                if (ex.IdExamen == id) utilizado++;
            }))
            let mensaje = '';
            if(utilizado>0) mensaje = "Este examen ha sido realizado en " + utilizado + " laboratorios";
            else mensaje = "Este examen no ha sido utilizado en ningún laboratorio";
            // console.log(utilizado);
            callback({ utilizado, mensaje})
        })
    }
}

export default new crud();