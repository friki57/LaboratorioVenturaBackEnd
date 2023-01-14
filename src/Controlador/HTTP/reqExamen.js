import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudExamen from "../Cruds/crudExamen.js";

export default (rutas) => {
    rutas.get("/examen/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Examen ********************\n");
        crudExamen.buscarTodo((pacientes)=>
        {
            res.json(pacientes)
            console.log("******************** Fin Leer Todo Examen ********************");
        })
    });
    rutas.post("/examen/agregar", async (req, res) => {
        console.log("******************** Agregar Examen ********************\nLlega:\n", req.body);
        req.body.Password = await encriptarContra(req.body.Password);
        req.body.Password = await desencriptarContra(req.body.Password);
        crudExamen.guardar(req.body,()=>
        {
            res.json({mensaje: "Examen Registrado con éxito"})
            console.log("******************** Fin Agregar Examen ********************");
        })
    });
}
