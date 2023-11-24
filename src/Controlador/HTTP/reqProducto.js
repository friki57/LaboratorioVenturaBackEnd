import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudProducto from "../Cruds/crudProducto.js";
import { calcularEdad } from "../../Utils/calcEdad.js";
import { filtrarPacientes } from "../../Utils/filtrar.js";

export default (rutas) => {
    rutas.get("/producto/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Producto ********************\n");
        crudProducto.buscarTodo((productos)=>
        {
            res.json(productos)
            console.log("******************** Fin Leer Todo Producto ********************");
        })
    });
    rutas.post("/producto/agregar", async (req, res) => {
        console.log("******************** Agregar Producto ********************\nLlega:\n", req.body);
        crudProducto.guardar(req.body,()=>
        {
            res.json({mensaje: "Producto Registrado con éxito"})
            console.log("******************** Fin Agregar Producto ********************");
        })
    });
    rutas.get("/producto/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Producto ********************\n");
        crudProducto.buscarTodo((productos) => {
            res.json({ cant: productos.length })
            console.log("******************** Fin Leer Cantidad Producto ********************");
        })
    });
    rutas.get("/producto/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Producto ********************\n");
        const { id } = req.params;
        crudProducto.buscarUno(id, (producto) => {
            res.json(producto)
            console.log("******************** Fin Leer Uno Producto ********************");
        })
    });
    rutas.post("/producto/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Producto ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudProducto.modificar(id, req.body, () => {
            res.json({ mensaje: "Producto Modificado con éxito" })
            console.log("******************** Fin Modificar Producto ********************");
        })
    });
    rutas.post("/producto/eliminar", async (req, res) => {
        console.log("******************** Eliminar Producto ********************\nLlega:\n", req.body);
        crudProducto.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Producto Eliminado con éxito" })
            console.log("******************** Fin Eliminar Producto ********************");
        });
    });
    rutas.post("/producto/buscar", async (req, res) => {
        console.log("******************** Buscar Producto ********************\n");
        console.log("Llega: ", req.body)
        crudProducto.buscarTodo((productos) => {
            productos = productos.map(p => p._doc)
            let filtro = req.body;
            let ret = filtrarPacientes(productos, filtro)
            // console.log("productos:", productos, "filtro:", filtro, "filtrado:", ret)
            res.json(ret)
            console.log("******************** Fin Buscar Producto ********************");
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
