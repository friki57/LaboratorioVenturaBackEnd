import mongoose from "mongoose";
import GrupoEliminado from "../../Modelo/GrupoEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        GrupoEliminado.find((err, group)=>
        {
            if(!err) callback(group)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        GrupoEliminado.findOne({ "_id": id }, (err, group) => {
            if (!err) callback(group)
            else console.log(err)
        });
    }
    this.guardar = (group, callback)=>
    {
        var objeto = new GrupoEliminado(group)
        objeto.save(group,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        GrupoEliminado.deleteone({ "_id": id }, (error, res) => {
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