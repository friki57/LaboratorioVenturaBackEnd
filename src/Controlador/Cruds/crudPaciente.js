import mongoose from "mongoose";
import Paciente from "../../Modelo/Paciente.js";
import crudPacienteEliminado from "./crudPacienteEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        Paciente.find((err, pacientes)=>
        {
            if(!err) callback(pacientes)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        Paciente.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.buscarNombres = (callback)=>
    {
        Paciente.find((err, pacientes)=>
        {
            if(!err) {
                pacientes = pacientes.filter(a => {
                    a = a._doc;
                    if (a.Nombres) a.NombreCompleto = a.Nombres.concat(" ", a.PrimerApellido, " ", a.SegundoApellido)
                    delete a.Genero
                    delete a.Telefono
                    delete a.Direccion
                    delete a.RazonSocial
                    delete a.NIT
                    delete a.Email
                    delete a.Password
                    delete a.__v
                    if (a.CI) return a;
                })
                callback(pacientes)
            }
            else console.log(err)
        });
    }
    this.guardar = (paciente, callback)=>
    {
        let objeto = new Paciente(paciente)
        objeto.save(paciente,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.modificar = (id, datosnuevos, callback) => {
        Paciente.updateOne({ "_id": id }, datosnuevos, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error modificando en la tabla: " + tabla + "-", error);
            }
        });
    }
    this.eliminar = (id, callback) => {
        this.buscarUno(id, (objeto)=>{
            crudPacienteEliminado.guardar(objeto, ()=>{
                Paciente.deleteOne({ "_id": id }, (error, res) => {
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