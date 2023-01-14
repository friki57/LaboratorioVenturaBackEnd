import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";

export default (rutas) => {
    rutas.get("/paciente/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Paciente ********************\n");
        crudPaciente.buscarTodo((pacientes)=>
        {
            res.json(pacientes)
            console.log("******************** Fin Leer Todo Paciente ********************");
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
}
