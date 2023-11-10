import mongoose from "mongoose";
import ProductoEliminado from "../../Modelo/ProductoEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        ProductoEliminado.find((err, pacientes)=>
        {
            if(!err) callback(pacientes)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        ProductoEliminado.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (paciente, callback)=>
    {
        var objeto = new ProductoEliminado(paciente)
        objeto.save(paciente,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        ProductoEliminado.deleteone({ "_id": id }, (error, res) => {
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