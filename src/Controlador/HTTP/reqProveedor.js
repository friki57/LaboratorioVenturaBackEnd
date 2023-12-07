import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudProveedor from "../Cruds/crudProveedor.js";
import { filtrarPacientes, filtrarProductos } from "../../Utils/filtrar.js";

export default (rutas) => {
    rutas.get("/proveedor/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Proveedor ********************\n");
        crudProveedor.buscarTodo((proveedores)=>
        {
            res.json(proveedores)
            console.log("******************** Fin Leer Todo Proveedor ********************");
        })
    });
    rutas.post("/proveedor/agregar", async (req, res) => {
        console.log("******************** Agregar Proveedor ********************\nLlega:\n", req.body);
        crudProveedor.guardar(req.body,()=>
        {
            res.json({mensaje: "Proveedor Registrado con éxito"})
            console.log("******************** Fin Agregar Proveedor ********************");
        })
    });
    rutas.get("/proveedor/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Proveedor ********************\n");
        crudProveedor.buscarTodo((proveedores) => {
            res.json({ cant: proveedores.length })
            console.log("******************** Fin Leer Cantidad Proveedor ********************");
        })
    });
    rutas.get("/proveedor/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Proveedor ********************\n");
        const { id } = req.params;
        crudProveedor.buscarUno(id, (proveedor) => {
            res.json(proveedor)
            console.log("******************** Fin Leer Uno Proveedor ********************");
        })
    });
    rutas.post("/proveedor/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Proveedor ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudProveedor.modificar(id, req.body, () => {
            res.json({ mensaje: "Proveedor Modificado con éxito" })
            console.log("******************** Fin Modificar Proveedor ********************");
        })
    });
    rutas.post("/proveedor/eliminar", async (req, res) => {
        console.log("******************** Eliminar Proveedor ********************\nLlega:\n", req.body);
        crudProveedor.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Proveedor Eliminado con éxito" })
            console.log("******************** Fin Eliminar Proveedor ********************");
        });
    });
    rutas.post("/proveedor/buscar", async (req, res) => {
        console.log("******************** Buscar Proveedor ********************\n");
        console.log("Llega: ", req.body)
        crudProveedor.buscarTodo((proveedores) => {
            console.log("proveedores:", proveedores)
            proveedores = proveedores.filter(p => p)
            proveedores = proveedores.map(p => p._doc)
            let filtro = req.body;
            let ret = filtrarProductos(proveedores, filtro)
            res.json(ret)
            console.log("******************** Fin Buscar Proveedor ********************");
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
