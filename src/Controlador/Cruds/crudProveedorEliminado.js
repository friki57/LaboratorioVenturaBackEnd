import mongoose from "mongoose";
import ProveedorEliminado from "../../Modelo/ProveedorEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        ProveedorEliminado.find((err, provider)=>
        {
            if(!err) callback(provider)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        ProveedorEliminado.findOne({ "_id": id }, (err, provider) => {
            if (!err) callback(provider)
            else console.log(err)
        });
    }
    this.guardar = (provider, callback)=>
    {
        var objeto = new ProveedorEliminado(provider)
        objeto.save(provider,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        ProveedorEliminado.deleteone({ "_id": id }, (error, res) => {
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