import mongoose from "mongoose";
import Paciente from "../../Modelo/Paciente.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Paciente.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var objeto = new Paciente(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
}

export default new crud();