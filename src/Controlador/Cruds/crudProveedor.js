import mongoose from "mongoose";
import Proveedor from "../../Modelo/Proveedor.js";
import crudProveedorEliminado from "./crudProveedorEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Proveedor.find((err, provider)=>
        {
            if(!err) callback(provider)
            else console.log(err)
        });
    }
    this.guardar = (provider, callback)=>
    {
        var objeto = new Proveedor(provider)
        objeto.save(provider,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.buscarNombres = (callback) => {
        Proveedor.find((err, productos) => {
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
        Proveedor.findOne({ "_id": id }, (err, provider) => {
            if (!err) callback(provider)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Proveedor.updateOne({ "_id": id }, datosnuevos, (error, res) => {
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
            crudProveedorEliminado.guardar(objeto, () => {
                Proveedor.deleteOne({ "_id": id }, (error, res) => {
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