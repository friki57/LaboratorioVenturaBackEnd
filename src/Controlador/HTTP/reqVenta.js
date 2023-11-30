import crudVenta from "../Cruds/crudVenta.js";
import { calcularEdad } from "../../Utils/calcEdad.js";
import { filtrarPacientes } from "../../Utils/filtrar.js";

export default (rutas) => {
    rutas.get("/venta/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Venta ********************\n");
        crudVenta.buscarTodo((ventas)=>
        {
            res.json(ventas)
            console.log("******************** Fin Leer Todo Venta ********************");
        })
    });
    rutas.post("/venta/agregar", async (req, res) => {
        const Fecha = (new Date()).toString();
        req.body = { ...req.body, Fecha, Cliente: req.body.Cliente._id };
        console.log("******************** Agregar Venta ********************\nLlega:\n", req.body);
        crudVenta.guardar(req.body,()=>
        {
            res.json({mensaje: "Venta Registrado con éxito"})
            console.log("******************** Fin Agregar Venta ********************");
        })
    });
    rutas.get("/venta/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Venta ********************\n");
        crudVenta.buscarTodo((ventas) => {
            res.json({ cant: ventas.length })
            console.log("******************** Fin Leer Cantidad Venta ********************");
        })
    });
    rutas.get("/venta/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Venta ********************\n");
        const { id } = req.params;
        crudVenta.buscarUno(id, (venta) => {
            res.json(venta)
            console.log("******************** Fin Leer Uno Venta ********************");
        })
    });
    rutas.post("/venta/modificar/:id", async (req, res) => {
        console.log("******************** Modificar Venta ********************\nLlega:\n", req.body);
        const { id } = req.params;
        crudVenta.modificar(id, req.body, () => {
            res.json({ mensaje: "Venta Modificado con éxito" })
            console.log("******************** Fin Modificar Venta ********************");
        })
    });
    rutas.post("/venta/eliminar", async (req, res) => {
        console.log("******************** Eliminar Venta ********************\nLlega:\n", req.body);
        crudVenta.eliminar(req.body.id, (r) => {
            console.log(r)
            res.json({ mensaje: "Venta Eliminado con éxito" })
            console.log("******************** Fin Eliminar Venta ********************");
        });
    });
    rutas.post("/venta/buscar", async (req, res) => {
        console.log("******************** Buscar Venta ********************\n");
        console.log("Llega: ", req.body)
        crudVenta.buscarNombres((ventas) => {
            ventas = ventas.map(p => p._doc)
            ventas = ventas.map(p => {
                p.Edad = calcularEdad(p.Fecha_de_Nacimiento)
                return p;
            })
            let filtro = req.body;
            let ret = filtrarPacientes(ventas, filtro)
            res.json(ret)
            console.log("******************** Fin Buscar Venta ********************");
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
