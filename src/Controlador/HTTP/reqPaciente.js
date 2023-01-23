import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
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
    rutas.get("/paciente/leerNombres", async (req, res) => {
        console.log("******************** Leer Nombres Paciente ********************\n");
        crudPaciente.buscarNombres((pacientes)=>
        {
            res.json(pacientes)
            console.log("******************** Fin Leer Nombres Paciente ********************");
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
}
