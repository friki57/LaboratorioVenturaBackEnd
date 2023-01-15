import mongoose from "mongoose";
import Laboratorio from "../../Modelo/Laboratorio.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Laboratorio.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var objeto = new Laboratorio(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
}

export default new crud();