import { filtrarLaboratorios } from "../../Utils/filtrar.js";
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
        console.log("******************** Modificar Laboratorio ********************\nLlega:\n", req.body, req.params);
        const { labo, exa } = req.params;
        crudLaboratorio.buscarUno(labo, (laboratorio)=>
        {
            laboratorio = laboratorio._doc;
            // laboratorio.ExamenesRealizados = laboratorio.ExamenesRealizados._doc
            let ind = 0
            laboratorio.ExamenesRealizados.map((ex,i) => {
                if(ex._id == exa) ind = i;
            })
            laboratorio.ExamenesRealizados[ind].Resultados = laboratorio.ExamenesRealizados[ind].Resultados.map(a => a._doc)
            let arr = []
            Object.getOwnPropertyNames(req.body).map(campo => {
                // laboratorio.ExamenesRealizados[ind].Resultados
                arr
                .push({
                    Id_Campo: campo,
                    Valor: req.body[campo]
                })
            })
            laboratorio.ExamenesRealizados[ind].Estado = "Realizado"
            laboratorio.ExamenesRealizados[ind].Resultados = arr;
            console.log("resultados: ", arr, laboratorio)
            crudLaboratorio.modificar(labo, laboratorio, () => {
                res.json({ mensaje: "Laboratorio Registrado con éxito" })
                console.log("******************** Fin Agregar Laboratorio ********************");
            })
        })

    });
    rutas.post("/laboratorio/buscar", async (req, res) => {
        console.log("******************** Buscar Laboratorio ********************\n");
        console.log("Llega: ", req.body)
        crudPaciente.buscarNombres((pacientes) => {
            crudExamen.buscarTodo((examenes) => {
                crudLaboratorio.buscarTodo((laboratorios) => {
                    let ret = laboratorios.map(a => a._doc);
                    ret = ret.map(a => {
                        a.Paciente = pacientes.find(b => b._id == a.IdPaciente)
                        a.ExamenesRealizados = a.ExamenesRealizados.map(b => {
                            b = b._doc;
                            b.Examen = examenes.find(c => c._id == b.IdExamen)
                            return b;
                        })
                        return a;
                    })
                    let filtro = req.body;
                    ret = filtrarLaboratorios(ret, filtro)
                    res.json(ret)
                    console.log("******************** Fin Buscar Laboratorio ********************");
                })
            })
        })
    });
    rutas.get("/laboratorio/reporte/:id", async (req, res) => {
        console.log("******************** Leer Uno Laboratorio ********************\n");
        const { id } = req.params;
        crudPaciente.buscarNombres((pacientes) => {
            crudExamen.buscarTodo((examenes) => {
                crudLaboratorio.buscarUno(id, (laboratorio) => {
                    let a = laboratorio._doc;
                    a.Paciente = pacientes.find(b => b._id == a.IdPaciente)
                    a.ExamenesRealizados = a.ExamenesRealizados.map(b => {
                        b = b._doc;
                        b.Examen = examenes.find(c => c._id == b.IdExamen)
                        return b;
                    })
                    let Examenes = a.ExamenesRealizados.map(a=>a.Examen._doc)
                    Examenes = a.ExamenesRealizados.map((a,i)=>{return {...Examenes[i], Resultados: a.Resultados}})
                    let Categorias = Examenes.map(ex => [...ex.Campos.map(camp => camp.SubCategoria)]).flat(1);
                    Categorias = [...new Set(Categorias)]
                    a.ExamenesRealizados = Examenes
                    a.Categorias = Categorias
                    let ExamenCategorizado = Categorias.map(cat=>
                        {
                            return Examenes.map(exa=>{
                                let encontrado = false;
                                let cam = exa.Campos.filter(camp=>
                                    {
                                        if(camp.SubCategoria==cat) 
                                        {
                                            encontrado = true;
                                            return camp
                                        }
                                    })
                                if(encontrado) return cam;
                            }).flat(1).filter(fi=>fi!=null)
                        })
                    console.log(Categorias, ExamenCategorizado)
                    a.ExamenCategorizado = ExamenCategorizado;
                    res.json(a)
                    console.log("******************** Fin Leer Uno Laboratorio ********************");
                })
            })
        })
    });
}
