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
        Usuario.deleteone({ "_id": id }, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error eliminando en la tabla: " + tabla + "-", error);
            }
        });
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
}

export default new crud();