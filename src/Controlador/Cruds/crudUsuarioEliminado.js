import mongoose from "mongoose";
import UsuarioEliminado from "../../Modelo/UsuarioEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        UsuarioEliminado.find((err, usuarios)=>
        {
            if(!err) callback(usuarios)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        UsuarioEliminado.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (usuario, callback)=>
    {
        var objeto = new UsuarioEliminado(usuario)
        objeto.save(usuario,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        UsuarioEliminado.deleteone({ "_id": id }, (error, res) => {
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