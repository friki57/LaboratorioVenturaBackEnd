import mongoose from "mongoose";
import SubgrupoEliminado from "../../Modelo/SubgrupoEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        SubgrupoEliminado.find((err, subgroup)=>
        {
            if(!err) callback(subgroup)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        SubgrupoEliminado.findOne({ "_id": id }, (err, subgroup) => {
            if (!err) callback(subgroup)
            else console.log(err)
        });
    }
    this.guardar = (subgroup, callback)=>
    {
        var objeto = new SubgrupoEliminado(subgroup)
        objeto.save(subgroup,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        SubgrupoEliminado.deleteone({ "_id": id }, (error, res) => {
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