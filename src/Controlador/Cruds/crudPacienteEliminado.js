import mongoose from "mongoose";
import PacienteEliminado from "../../Modelo/PacienteEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        PacienteEliminado.find((err, pacientes)=>
        {
            if(!err) callback(pacientes)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        PacienteEliminado.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (paciente, callback)=>
    {
        var objeto = new PacienteEliminado(paciente)
        objeto.save(paciente,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        PacienteEliminado.deleteone({ "_id": id }, (error, res) => {
            if (!error) {
                callback(res);
            }
            else {
                console.log("Error eliminando en la tabla: " + tabla + "-", error);
            }
        });
    }
}

export default new crud();