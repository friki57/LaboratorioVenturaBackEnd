import crudExamen from "../Cruds/crudExamen.js";
import crudLaboratorio from "../Cruds/crudLaboratorio.js";
import crudPaciente from "../Cruds/crudPaciente.js";

export default (rutas) => {
    rutas.get("/laboratorio/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Laboratorio ********************\n");
        crudPaciente.buscarNombres((pacientes)=>
        {
            crudExamen.buscarTodo((examenes)=>
            {
                crudLaboratorio.buscarTodo((laboratorios) => {
                    let ret = laboratorios.map(a=>a._doc);
                    ret = ret.map(a=>
                        {
                            a.Paciente = pacientes.find(b=>b._id == a.IdPaciente)
                            a.ExamenesRealizados = a.ExamenesRealizados.map(b=>{
                                b=b._doc;
                                b.Examen = examenes.find(c=>c._id==b.IdExamen)
                                return b;
                            })
                            return a;
                        })
                    res.json(ret)
                    console.log("******************** Fin Leer Todo Laboratorio ********************");
                })
            })
        })
    });
    rutas.get("/laboratorio/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Laboratorio ********************\n");
        const {id} = req.params;
        crudPaciente.buscarNombres((pacientes)=>
        {
            crudExamen.buscarTodo((examenes)=>
            {
                crudLaboratorio.buscarUno(id, (laboratorio) => {
                    let a = laboratorio._doc;
                    a.Paciente = pacientes.find(b=>b._id == a.IdPaciente)
                    a.ExamenesRealizados = a.ExamenesRealizados.map(b=>{
                        b=b._doc;
                        b.Examen = examenes.find(c=>c._id==b.IdExamen)
                        return b;
                    })
                    res.json(a)
                    console.log("******************** Fin Leer Uno Laboratorio ********************");
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
            Fecha: req.body.Fecha,
            Motivo: req.body.motivo,
            ExamenesRealizados 
        }
        console.log("laboratorio:", laboratorio)
        crudLaboratorio.guardar(laboratorio, () => {
            res.json({ mensaje: "Laboratorio Registrado con éxito" })
            console.log("******************** Fin Agregar Laboratorio ********************");
        })
    });
    rutas.post("/laboratorio/modificar/:labo/:exa", async (req, res) => {
        console.log("******************** Modificar Laboratorio ********************\nLlega:\n", req.body, labo, exa);
        const { labo, exa } = req.params;
        crudLaboratorio.buscarUno(labo, (laboratorio)=>
        {
            laboratorio = laboratorio._doc;
            // laboratorio.ExamenesRealizados = laboratorio.ExamenesRealizados._doc
            console.log(laboratorio, "exa", exa)
            let ind = 0
            laboratorio.ExamenesRealizados.map((ex,i) => {
                if(ex.IdExamen == exa) ind = i;
            })
            console.log("ind",ind)
            laboratorio.ExamenesRealizados[ind].Resultados = laboratorio.ExamenesRealizados[ind].Resultados._doc
            req.body.getOwnPropertyNames().map(campo => {
                laboratorio.ExamenesRealizados[ind].Resultados.push({
                    Id_Campo: campo,
                    Valor: req.body[campo]
                })
            })
            console.log("resultados: ", laboratorio)
            res.json({ mensaje: "Pendiente" })
        })

    });
}
