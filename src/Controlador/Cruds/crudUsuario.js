import mongoose from "mongoose";
import Usuario from "../../Modelo/Usuario.js";
import crudUsuarioEliminado from "./crudUsuarioEliminado.js";

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
    this.buscarPorCorreo = (correo, callback)=>
    {
        Usuario.find((err, users)=>
        {
            const user = users.find(us=>us.Email === correo);
            if(!err) callback(user)
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
    this.buscarNombres = (callback) => {
        Usuario.find((err, usuarios) => {
            if (!err) {
                usuarios = usuarios.filter(a => {
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
                callback(usuarios)
            }
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        Usuario.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Usuario.updateOne({ "_id": id }, datosnuevos, (error, res) => {
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
            crudUsuarioEliminado.guardar(objeto, () => {
                Usuario.deleteOne({ "_id": id }, (error, res) => {
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