import crudExamen from "../Cruds/crudExamen.js";
import crudLaboratorio from "../Cruds/crudLaboratorio.js";
import crudPaciente from "../Cruds/crudPaciente.js";

export default (rutas) => {
    rutas.get("/laboratorio/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Laboratorio ********************\n");
        crudPaciente.buscarTodo((pacientes)=>
        {
            crudExamen.buscarTodo((examenes)=>
            {
                crudLaboratorio.buscarTodo((laboratorios) => {
                    let ret = laboratorios.map(a=>a._doc);
                    ret = ret.map(a=>
                        {
                            a.paciente = pacientes.find(b=>b._id == a.IdPaciente)
                            a.examenes = examenes.map(b=>a.ExamenesRealizados.find(c=>c.IdExamen==b._id))
                        })
                    res.json(ret)
                    console.log("******************** Fin Leer Todo Laboratorio ********************");
                })
            })
        })
    });
    rutas.post("/laboratorio/agregar", async (req, res) => {
        console.log("******************** Agregar Laboratorio ********************\nLlega:\n", req.body);
        let ExamenesRealizados = req.body.examenes.map(a=>
            {
                let ex = {
                    IdExamen: a._id,
                    Estado: "Pendiente"
                }
                return ex;
            })
        let laboratorio = {
            IdPaciente: req.body.paciente._id,
            Fecha: (new Date()).toString(),
            Motivo: req.body.motivo,
            ExamenesRealizados 
        }
        console.log("laboratorio:", laboratorio)
        crudLaboratorio.guardar(laboratorio, () => {
            res.json({ mensaje: "Laboratorio Registrado con éxito" })
            console.log("******************** Fin Agregar Laboratorio ********************");
        })
    });
}
