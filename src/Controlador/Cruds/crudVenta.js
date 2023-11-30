import mongoose from "mongoose";
import Venta from "../../Modelo/Venta.js";
import crudVentaEliminado from "./crudVentaEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Venta.find((err, sale)=>
        {
            if(!err) callback(sale)
            else console.log(err)
        });
    }
    this.guardar = (sale, callback)=>
    {
        var objeto = new Venta(sale)
        objeto.save(sale,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.buscarUno = (id, callback) => {
        Venta.findOne({ "_id": id }, (err, sale) => {
            if (!err) callback(sale)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Venta.updateOne({ "_id": id }, datosnuevos, (error, res) => {
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
            crudVentaEliminado.guardar(objeto, () => {
                Venta.deleteOne({ "_id": id }, (error, res) => {
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