import { filtrarLaboratorios } from "../../Utils/filtrar.js";
import crudExamen from "../Cruds/crudExamen.js";
import crudLaboratorio from "../Cruds/crudLaboratorio.js";
import crudPaciente from "../Cruds/crudPaciente.js";

import { valRef } from "../../Utils/valRef.js";
import { calcularEdad } from "../../Utils/calcEdad.js"
import { reporteLaboratorio } from "../../Utils/docx.js";
export default (rutas) => {
    rutas.post("/laboratorio/eliminar", async (req, res) => {
        console.log("******************** Eliminar Laboratorio ********************\nLlega:\n", req.body);
        crudLaboratorio.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Laboratorio Eliminado con éxito" })
            console.log("******************** Fin Eliminar Laboratorio ********************");
        });
    });
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
                            if(a.Paciente==undefined) a.Paciente = {
                                CodigoPaciente: "0000",
                                CI: "0",
                                Nombres: "Desconocido o eliminado",
                                NombreCompleto: "Desconocido o eliminado",
                                PrimerApellido: "",
                                SegundoApellido: "",
                                Fecha_de_Nacimiento: "01-01-2023",
                                Genero: "",
                                Telefono: 0,
                                Direccion: "",
                                RazonSocial: "",
                                NIT: "",
                                Email: "",
                                Password: ""
                            }
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
            let ind = 0
            laboratorio.ExamenesRealizados.map((ex,i) => {
                if(ex._id == exa) ind = i;
            })
            laboratorio.ExamenesRealizados[ind].Resultados = laboratorio.ExamenesRealizados[ind].Resultados.map(a => a._doc)
            let Materia = req.body.materia;
            delete req.body.materia;
            let arr = []
            Object.getOwnPropertyNames(req.body).map(campo => {
                arr.push({
                    Id_Campo: campo,
                    Valor: req.body[campo]
                })
            })
            laboratorio.ExamenesRealizados[ind].Materia = Materia
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
                        if (a.Paciente == undefined) a.Paciente = {
                            CodigoPaciente: "0000",
                            CI: "0",
                            Nombres: "Desconocido o eliminado",
                            NombreCompleto: "Desconocido o eliminado",
                            PrimerApellido: "",
                            SegundoApellido: "",
                            Fecha_de_Nacimiento: "01-01-2023",
                            Genero: "",
                            Telefono: 0,
                            Direccion: "",
                            RazonSocial: "",
                            NIT: "",
                            Email: "",
                            Password: ""
                        }
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
                    // console.log(Categorias, ExamenCategorizado)

                    a.ExamenCategorizado = ExamenCategorizado;

                    let resultados = []
                    a.ExamenesRealizados.map(ex => {
                        ex.Resultados.map(rest => {
                            resultados.push({ id: rest.Id_Campo, val: rest.Valor, examen: ex.Nombre, cat: ex.Categoria })
                            // console.log(rest.Id_Campo, rest.Valor)
                        })
                    })
                    // console.log(resultados)
                    a.ExamenCategorizado = a.ExamenCategorizado.map(cat => {
                        return cat.map(ex => {
                            ex=ex._doc
                            ex.dentroRango = ""
                            ex.fueraRango = ""
                            // console.log(ex)
                            let re = resultados.find(r => r.id == ex._id)
                            if (re) {
                                // console.log(ex._id, ex.Nombre)
                                ex.Resultado = re.val
                                ex.NombreExamen = re.examen
                                ex.Categoria = re.cat
                                ex.valRef = valRef(ex.ValorReferencia, ex.Resultado)
                                if (ex.valRef == 0) ex.dentroRango = ex.Resultado
                                else ex.fueraRango = ex.Resultado
                                if (ex.valRef == undefined) {
                                    ex.dentroRango = ex.Resultado
                                    ex.fueraRango = ""
                                }
                            }
                            else ex.Resultado = ""
                            return ex
                        })
                    })
                    a.Categorias = a.Categorias.map((cat,i)=>{
                        return {nombre: cat, examenes: a.ExamenCategorizado[i]}
                    })
                    delete a.ExamenCategorizado;
                    let examene = [...new Set(a.ExamenesRealizados.map(ex => {return {Nombre: ex.Nombre, Categoria: ex.Categoria, Campos: ex.Campos.map(cam=>cam._id)}}))]
                    let catp = [...new Set(a.ExamenesRealizados.map(ex => ex.Categoria))]
                    let examf = catp.map(cat=>
                        {
                            return {
                                Categoria: cat,
                                Examenes: examene.filter(ex=>ex.Categoria==cat)
                            }
                        })
                    examf = examf.map(cat => {
                        cat.Examenes = cat.Examenes.map(ex=>{   
                            ex.SubCategoria = []
                            ex.Campos.map(cam=>{
                                let ncam = {}
                                a.Categorias.map((sub,i)=>
                                    {
                                        if(!ex.SubCategoria.map(cs=>cs.Nombre).includes(sub.nombre))
                                        {
                                            ex.SubCategoria.push({
                                                Nombre: sub.nombre,
                                                Campos: []
                                            })
                                        }
                                        let subexid = sub.examenes.map(subex=>subex._id)
                                        if(subexid.includes(cam))
                                        {
                                            ncam = sub.examenes.find(subex=>subex._id==cam)
                                            ex.SubCategoria[i].Campos.push(ncam)
                                        }
                                    })
                            })
                            return ex;
                        })
                        // console.log(ex.SubCategoria)
                        return cat;
                    })
                    delete a.Categorias
                    examf = examf.map(cat=>
                        {
                            cat.Examenes = cat.Examenes.map(ex=>{
                                delete ex.Campos;
                                ex.SubCategoria = ex.SubCategoria.filter(sub=>{
                                    if(sub.Campos.length>0)
                                        return sub;
                                })
                                return ex;
                            })
                            return cat;
                        })
                    a.ExamenesFinal = examf
                    a.Paciente = a.Paciente._doc
                    a.Paciente.Edad = calcularEdad(a.Paciente.Fecha_de_Nacimiento)
                    console.log(JSON.parse(JSON.stringify(a, null, 4)))
                    reporteLaboratorio(JSON.parse(JSON.stringify(a, null, 4)), ()=>
                    {
                       res.download("./src/Utils/ReporteLaboratorio.docx")
                        console.log("******************** Fin Leer Uno Laboratorio ********************");
                    })
                    // res.json(a)
                })
            })
        })
    });
}
