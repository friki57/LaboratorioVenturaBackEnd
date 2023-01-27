import mongoose from "mongoose";
import Laboratorio from "../../Modelo/Laboratorio.js";
import crudLaboratorioEliminado from "./crudLaboratorioEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Laboratorio.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback)=>
    {
        Laboratorio.findOne({ "_id": id }, (err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var objeto = new Laboratorio(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.modificar = (id, datosnuevos, callback) => {
        Laboratorio.updateOne({ "_id": id }, datosnuevos, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error modificando en la tabla: " + tabla + "-", error);
            }
        });
    }
    this.eliminar = (id, callback) => {
        this.buscarUno(id, (objeto) => {
            crudLaboratorioEliminado.guardar(objeto, () => {
                Paciente.deleteOne({ "_id": id }, (error, res) => {
                    if (!error) {
                        callback(res);
                    }
                    else {
                        console.log("Error eliminando en la tabla: " + tabla + "-", error);
                    }
                });
            })
        })
    }
}

export default new crud();