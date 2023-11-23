import mongoose from "mongoose";
import Inventario from "../../Modelo/Inventario.js";
import crudProductoEliminado from "./crudProductoEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Inventario.find((err, inventory)=>
        {
            if(!err) callback(inventory)
            else console.log(err)
        });
    }
    this.guardar = (inventory, callback)=>
    {
        var objeto = new Inventario(inventory)
        objeto.save(inventory,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.buscarUno = (id, callback) => {
        Inventario.findOne({ "_id": id }, (err, inventory) => {
            if (!err) callback(inventory)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Inventario.updateOne({ "_id": id }, datosnuevos, (error, res) => {
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
            crudProductoEliminado.guardar(objeto, () => {
                Inventario.deleteOne({ "_id": id }, (error, res) => {
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