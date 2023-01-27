import mongoose from "mongoose";
import LaboratorioEliminado from "../../Modelo/LaboratorioEliminado.js";

function crud()
{
    this.buscarTodo = (callback)=>
    {
        LaboratorioEliminado.find((err, pacientes)=>
        {
            if(!err) callback(pacientes)
            else console.log(err)
        });
    }
    this.buscarUno = (id, callback) => {
        LaboratorioEliminado.findOne({ "_id": id }, (err, product) => {
            if (!err) callback(product)
            else console.log(err)
        });
    }
    this.guardar = (paciente, callback)=>
    {
        var objeto = new LaboratorioEliminado(paciente)
        objeto.save(paciente,(err)=>
            {
                err && console.log(err)
                callback();
            })
    }
    this.eliminar = (id, callback) => {
        // this.buscarUno(id, )
        LaboratorioEliminado.deleteone({ "_id": id }, (error, res) => {
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