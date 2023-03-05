import Laboratorio from "../../Modelo/Laboratorio.js";
import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudExamen from "../Cruds/crudExamen.js";

export default (rutas) => {
    rutas.get("/examen/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Examen ********************\n");
        crudExamen.buscarTodo((examenes)=>
        {
            res.json(examenes)
            console.log("******************** Fin Leer Todo Examen ********************");
        })
    });
    rutas.get("/examen/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Examen ********************\n");
        const { id } = req.params;
        crudExamen.buscarUno(id, (examenes)=>
        {
            res.json(examenes)
            console.log("******************** Fin Leer Uno Examen ********************");
        })
    });
    rutas.get("/examen/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Examen ********************\n");
        crudExamen.buscarTodo((examenes) => {
            res.json({ cant: examenes.length })
            console.log("******************** Fin Leer Cantidad Examen ********************");
        })
    });
    rutas.post("/examen/agregar", async (req, res) => {
        console.log("******************** Agregar Examen ********************\nLlega:\n", req.body);
        crudExamen.guardar(req.body,()=>
        {
            res.json({mensaje: "Examen Registrado con éxito"})
            console.log("******************** Fin Agregar Examen ********************");
        })
    });
    rutas.post("/examen/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Examen ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudExamen.modificar(id, req.body, () => {
            res.json({ mensaje: "Examen Modificado con éxito" })
            console.log("******************** Fin Modificar Examen ********************");
        })
    });

    rutas.post("/examen/verificarUso", async (req, res) => {
        // console.log("******************** Eliminar Examen ********************\nLlega:\n", req.body);
        const { id } = req.body;
        crudExamen.verificarUso(id, (uso)=>{
            res.json(uso);
        })
    });
    rutas.post("/examen/eliminar", async (req, res) => {
        console.log("******************** Eliminar Examen ********************\nLlega:\n", req.body);
        const { id } = req.body;
        crudExamen.verificarUso(id, (uso)=>{
            if(uso.utilizado == 0){
                crudExamen.eliminar(req.body.id, (r) => {
                    console.log(r)
                    res.json({ mensaje: "Examen Eliminado con éxito" })
                    console.log("******************** Fin Eliminar Examen ********************");
                });
            }
            else res.json(uso);
        })
    });
}
