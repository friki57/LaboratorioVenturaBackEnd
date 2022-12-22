const mongoose = require("mongoose")
const Producto = require("../../Modelo/Producto")

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Producto.find((err, product)=>
        {
            if(!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (product, callback)=>
    {
        var producto = new Producto(product)
        producto.save(product,()=>
            {
                callback();
            })
    }
}

module.exports = new crud();