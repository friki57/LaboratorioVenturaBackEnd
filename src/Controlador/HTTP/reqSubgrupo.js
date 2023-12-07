import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudSubgrupo from "../Cruds/crudSubgrupo.js";
import { filtrarPacientes, filtrarProductos } from "../../Utils/filtrar.js";

export default (rutas) => {
    rutas.get("/subgrupo/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Subgrupo ********************\n");
        crudSubgrupo.buscarTodo((subgrupos)=>
        {
            res.json(subgrupos)
            console.log("******************** Fin Leer Todo Subgrupo ********************");
        })
    });
    rutas.post("/subgrupo/agregar", async (req, res) => {
        console.log("******************** Agregar Subgrupo ********************\nLlega:\n", req.body);
        crudSubgrupo.guardar(req.body,()=>
        {
            res.json({mensaje: "Subgrupo Registrado con éxito"})
            console.log("******************** Fin Agregar Subgrupo ********************");
        })
    });
    rutas.get("/subgrupo/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Subgrupo ********************\n");
        crudSubgrupo.buscarTodo((subgrupos) => {
            res.json({ cant: subgrupos.length })
            console.log("******************** Fin Leer Cantidad Subgrupo ********************");
        })
    });
    rutas.get("/subgrupo/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Subgrupo ********************\n");
        const { id } = req.params;
        crudSubgrupo.buscarUno(id, (subgrupo) => {
            res.json(subgrupo)
            console.log("******************** Fin Leer Uno Subgrupo ********************");
        })
    });
    rutas.post("/subgrupo/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Subgrupo ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudSubgrupo.modificar(id, req.body, () => {
            res.json({ mensaje: "Subgrupo Modificado con éxito" })
            console.log("******************** Fin Modificar Subgrupo ********************");
        })
    });
    rutas.post("/subgrupo/eliminar", async (req, res) => {
        console.log("******************** Eliminar Subgrupo ********************\nLlega:\n", req.body);
        crudSubgrupo.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Subgrupo Eliminado con éxito" })
            console.log("******************** Fin Eliminar Subgrupo ********************");
        });
    });
    rutas.post("/subgrupo/buscar", async (req, res) => {
        console.log("******************** Buscar Subgrupo ********************\n");
        console.log("Llega: ", req.body)
        crudSubgrupo.buscarTodo((subgrupos) => {
            console.log("subgrupos:", subgrupos)
            subgrupos = subgrupos.filter(p => p)
            subgrupos = subgrupos.map(p => p._doc)
            let filtro = req.body;
            let ret = filtrarProductos(subgrupos, filtro)
            res.json(ret)
            console.log("******************** Fin Buscar Subgrupo ********************");
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
