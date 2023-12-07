import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudGrupo from "../Cruds/crudGrupo.js";
import { filtrarPacientes, filtrarProductos } from "../../Utils/filtrar.js";

export default (rutas) => {
    rutas.get("/grupo/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Grupo ********************\n");
        crudGrupo.buscarTodo((grupos)=>
        {
            res.json(grupos)
            console.log("******************** Fin Leer Todo Grupo ********************");
        })
    });
    rutas.post("/grupo/agregar", async (req, res) => {
        console.log("******************** Agregar Grupo ********************\nLlega:\n", req.body);
        crudGrupo.guardar(req.body,()=>
        {
            res.json({mensaje: "Grupo Registrado con éxito"})
            console.log("******************** Fin Agregar Grupo ********************");
        })
    });
    rutas.get("/grupo/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Grupo ********************\n");
        crudGrupo.buscarTodo((grupos) => {
            res.json({ cant: grupos.length })
            console.log("******************** Fin Leer Cantidad Grupo ********************");
        })
    });
    rutas.get("/grupo/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Grupo ********************\n");
        const { id } = req.params;
        crudGrupo.buscarUno(id, (grupo) => {
            res.json(grupo)
            console.log("******************** Fin Leer Uno Grupo ********************");
        })
    });
    rutas.post("/grupo/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Grupo ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudGrupo.modificar(id, req.body, () => {
            res.json({ mensaje: "Grupo Modificado con éxito" })
            console.log("******************** Fin Modificar Grupo ********************");
        })
    });
    rutas.post("/grupo/eliminar", async (req, res) => {
        console.log("******************** Eliminar Grupo ********************\nLlega:\n", req.body);
        crudGrupo.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Grupo Eliminado con éxito" })
            console.log("******************** Fin Eliminar Grupo ********************");
        });
    });
    rutas.post("/grupo/buscar", async (req, res) => {
        console.log("******************** Buscar Grupo ********************\n");
        console.log("Llega: ", req.body)
        crudGrupo.buscarTodo((grupos) => {
            console.log("grupos:", grupos)
            grupos = grupos.filter(p => p)
            grupos = grupos.map(p => p._doc)
            let filtro = req.body;
            let ret = filtrarProductos(grupos, filtro)
            res.json(ret)
            console.log("******************** Fin Buscar Grupo ********************");
        })
    });
/*     rutas.get("/", (req, res) => {
        crudProduct.buscarTodo(a => res.json(a))
    });
    rutas.get("/product/cant", (req, res) => {
        crudProduct.buscarTodo(a => res.json(3))
    });
    rutas.get("/product/:id", (req, res) => {
        crudProduct.buscarTodo(a => res.json(a))
    }); */
}
