import mongoose from "mongoose";
import Subgrupo from "../../Modelo/Subgrupo.js";
import crudSubgrupoEliminado from "./crudSubgrupoEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Subgrupo.find((err, subgroup)=>
        {
            if(!err) callback(subgroup)
            else console.log(err)
        });
    }
    this.guardar = (subgroup, callback)=>
    {
        var objeto = new Subgrupo(subgroup)
        objeto.save(subgroup,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.buscarNombres = (callback) => {
        Subgrupo.find((err, subgroups) => {
            if (!err) {
                subgroups = subgroups.filter(a => {
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
                callback(subgroups)
            }
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        Subgrupo.findOne({ "_id": id }, (err, subgroup) => {
            if (!err) callback(subgroup)
            else console.log(err)
        });
    }
    this.modificar = (id, datosnuevos, callback) => {
        Subgrupo.updateOne({ "_id": id }, datosnuevos, (error, res) => {
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
            crudSubgrupoEliminado.guardar(objeto, () => {
                Subgrupo.deleteOne({ "_id": id }, (error, res) => {
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