import mongoose from "mongoose";
import Paciente from "../../Modelo/Paciente.js";

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
    this.buscarNombres = (callback)=>
    {
        console.log("buscarnombres")
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
        var objeto = new Paciente(paciente)
        objeto.save(paciente,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
}

export default new crud();