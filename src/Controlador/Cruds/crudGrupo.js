import mongoose from "mongoose";
import Grupo from "../../Modelo/Grupo.js";
import crudGrupoEliminado from "./crudGrupoEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Grupo.find((err, group)=>
        {
            if(!err) callback(group)
            else console.log(err)
        });
    }
    this.guardar = (group, callback)=>
    {
        var objeto = new Grupo(group)
        objeto.save(group,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.buscarNombres = (callback) => {
        Grupo.find((err, groups) => {
            if (!err) {
                groups = groups.filter(a => {
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
                callback(groups)
            }
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        Grupo.findOne({ "_id": id }, (err, group) => {
            if (!err) callback(group)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Grupo.updateOne({ "_id": id }, datosnuevos, (error, res) => {
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
            crudGrupoEliminado.guardar(objeto, () => {
                Grupo.deleteOne({ "_id": id }, (error, res) => {
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