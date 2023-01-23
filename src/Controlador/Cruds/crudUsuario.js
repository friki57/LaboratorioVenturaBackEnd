import mongoose from "mongoose";
import Usuario from "../../Modelo/Usuario.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Usuario.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var objeto = new Usuario(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        Examen.deleteone({ "_id": id }, (error, res) => {
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