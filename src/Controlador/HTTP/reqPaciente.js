import { calcularEdad } from "../../Utils/calcEdad.js";
import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import { filtrarPacientes } from "../../Utils/filtrar.js";
import crudPaciente from "../Cruds/crudPaciente.js";

export default (rutas) => {
    rutas.get("/paciente/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Paciente ********************\n");
        crudPaciente.buscarTodo((pacientes)=>
        {
            res.json(pacientes)
            console.log("******************** Fin Leer Todo Paciente ********************");
        })
    });
    rutas.get("/paciente/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Paciente ********************\n");
        crudPaciente.buscarTodo((pacientes)=>
        {
            res.json({ cant: pacientes.length })
            console.log("******************** Fin Leer Cantidad Paciente ********************");
        })
    });
    rutas.get("/paciente/leerNombres", async (req, res) => {
        console.log("******************** Leer Nombres Paciente ********************\n");
        crudPaciente.buscarNombres((pacientes)=>
        {
            pacientes = pacientes.map((pac)=>({
                ...pac._doc, edad: calcularEdad(pac._doc.Fecha_de_Nacimiento)
            }));
            res.json(pacientes)
            console.log("******************** Fin Leer Nombres Paciente ********************");
        })
    });
    rutas.get("/paciente/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Paciente ********************\n");
        const { id } = req.params;
        crudPaciente.buscarUno(id, (paciente)=>
        {
            res.json(paciente)
            console.log("******************** Fin Leer Uno Paciente ********************");
        })
    });
    rutas.post("/paciente/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Paciente ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudPaciente.modificar(id, req.body, ()=>
        {
            res.json({ mensaje: "Paciente Modificado con éxito" })
            console.log("******************** Fin Modificar Paciente ********************");
        })
    });
    rutas.post("/paciente/agregar", async (req, res) => {
        console.log("******************** Agregar Paciente ********************\nLlega:\n", req.body);
        req.body.Password = await encriptarContra(req.body.Password);
        req.body.Password = await desencriptarContra(req.body.Password);
        crudPaciente.guardar(req.body,()=>
        {
            res.json({mensaje: "Paciente Registrado con éxito"})
            console.log("******************** Fin Agregar Paciente ********************");
        })
    });
    rutas.post("/paciente/eliminar", async (req, res) => {
        console.log("******************** Eliminar Paciente ********************\nLlega:\n", req.body);
        crudPaciente.eliminar(req.body.id, (r)=>
        {
            console.log(r)
            res.json({mensaje: "Paciente Eliminado con éxito"})
            console.log("******************** Fin Eliminar Paciente ********************");
        });
    });
    rutas.post("/paciente/buscar", async (req, res) => {
        console.log("******************** Buscar Paciente ********************\n");
        console.log("Llega: ", req.body)
        crudPaciente.buscarNombres((pacientes) => {
            pacientes = pacientes.map(p=>p._doc)
            pacientes = pacientes.map(p=>
                {
                    p.Edad = calcularEdad(p.Fecha_de_Nacimiento)
                    return p;
                })
            let filtro = req.body;
            let ret = filtrarPacientes(pacientes, filtro)
            res.json(ret)
            console.log("******************** Fin Buscar Paciente ********************");
        })
    });
}
