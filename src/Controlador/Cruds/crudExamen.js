import mongoose from "mongoose";
import Examen from "../../Modelo/Examen.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Examen.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var objeto = new Examen(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
}

export default new crud();