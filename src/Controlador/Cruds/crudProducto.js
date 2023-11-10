import mongoose from "mongoose";
import Producto from "../../Modelo/Producto.js";
import crudProductoEliminado from "./crudProductoEliminado.js";

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
        var objeto = new Producto(product)
        objeto.save(product,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.buscarNombres = (callback) => {
        Producto.find((err, productos) => {
            if (!err) {
                productos = productos.filter(a => {
                    a = a._doc;
                    if (a.Nombres) a.NombreCompleto = a.Nombres.concat(" ", a.PrimerApellido, " ", a.SegundoApellido)
                    // delete a.Genero
                    // delete a.Telefono
                    // delete a.Direccion
                    // delete a.RazonSocial
                    // delete a.NIT
                    // delete a.Email
                    delete a.Password
                    delete a.__v
                    if (a.CI) return a;
                })
                callback(productos)
            }
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        Producto.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Producto.updateOne({ "_id": id }, datosnuevos, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error modificando en la tabla: " + tabla + "-", error);
            }
        });
    }
    this.eliminar = (id, callback) => {
        this.buscarUno(id, (objeto) => {
            crudProductoEliminado.guardar(objeto, () => {
                Producto.deleteOne({ "_id": id }, (error, res) => {
                    if (!error) {
                        callback(res);
                    }
                    else {
                        console.log("Error eliminando en la tabla: " + tabla + "-", error);
                    }
                });
            })
        })
    }
}

export default new crud();