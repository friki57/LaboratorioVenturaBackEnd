import crudInventario from "../Cruds/crudInventario.js";
import { calcularEdad } from "../../Utils/calcEdad.js";
import { filtrarPacientes } from "../../Utils/filtrar.js";

export default (rutas) => {
    rutas.get("/inventario/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Inventario ********************\n");
        crudInventario.buscarTodo((inventarios)=>
        {
            res.json(inventarios)
            console.log("******************** Fin Leer Todo Inventario ********************");
        })
    });
    rutas.post("/inventario/agregar", async (req, res) => {
        const Fecha = (new Date()).toString();
        req.body = { ...req.body, Fecha };
        console.log("******************** Agregar Inventario ********************\nLlega:\n", req.body);
        crudInventario.guardar(req.body,()=>
        {
            res.json({mensaje: "Inventario Registrado con éxito"})
            console.log("******************** Fin Agregar Inventario ********************");
        })
    });
    rutas.get("/inventario/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Inventario ********************\n");
        crudInventario.buscarTodo((inventarios) => {
            res.json({ cant: inventarios.length })
            console.log("******************** Fin Leer Cantidad Inventario ********************");
        })
    });
    rutas.get("/inventario/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Inventario ********************\n");
        const { id } = req.params;
        crudInventario.buscarUno(id, (inventario) => {
            res.json(inventario)
            console.log("******************** Fin Leer Uno Inventario ********************");
        })
    });
    rutas.post("/inventario/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Inventario ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudInventario.modificar(id, req.body, () => {
            res.json({ mensaje: "Inventario Modificado con éxito" })
            console.log("******************** Fin Modificar Inventario ********************");
        })
    });
    rutas.post("/inventario/eliminar", async (req, res) => {
        console.log("******************** Eliminar Inventario ********************\nLlega:\n", req.body);
        crudInventario.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Inventario Eliminado con éxito" })
            console.log("******************** Fin Eliminar Inventario ********************");
        });
    });
    rutas.post("/inventario/buscar", async (req, res) => {
        console.log("******************** Buscar Inventario ********************\n");
        console.log("Llega: ", req.body)
        crudInventario.buscarNombres((inventarios) => {
            inventarios = inventarios.map(p => p._doc)
            inventarios = inventarios.map(p => {
                p.Edad = calcularEdad(p.Fecha_de_Nacimiento)
                return p;
            })
            let filtro = req.body;
            let ret = filtrarPacientes(inventarios, filtro)
            res.json(ret)
            console.log("******************** Fin Buscar Inventario ********************");
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
