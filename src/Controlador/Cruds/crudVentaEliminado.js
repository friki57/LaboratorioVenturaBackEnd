import mongoose from "mongoose";
import Venta from "../../Modelo/Venta.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Venta.find((err, usuarios)=>
        {
            if(!err) callback(usuarios)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        Venta.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (usuario, callback)=>
    {
        var objeto = new Venta(usuario)
        objeto.save(usuario,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        Venta.deleteone({ "_id": id }, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error eliminando en la tabla: " + tabla + "-", error);
            }
        });
    }
}

export default new crud();