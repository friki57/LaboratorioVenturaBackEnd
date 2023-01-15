import crudLaboratorio from "../Cruds/crudLaboratorio.js";

export default (rutas) => {
    rutas.get("/laboratorio/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Laboratorio ********************\n");
        crudLaboratorio.buscarTodo((laboratorios) => {
            res.json(laboratorios)
            console.log("******************** Fin Leer Todo Laboratorio ********************");
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
