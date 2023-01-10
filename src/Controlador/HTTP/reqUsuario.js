import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";

export default (rutas) => {
    rutas.get("/usuario/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Usuario ********************\n");
        crudUsuario.buscarTodo((usuarios)=>
        {
            res.json(usuarios)
            console.log("******************** Fin Leer Todo Usuario ********************");
        })
    });
    rutas.post("/usuario/agregar", async (req, res) => {
        console.log("******************** Agregar Usuario ********************\nLlega:\n", req.body);
        req.body.Password = await encriptarContra(req.body.Password);
        req.body.Password = await desencriptarContra(req.body.Password);
        crudUsuario.guardar(req.body,()=>
        {
            res.json({mensaje: "Usuario Registrado con éxito"})
            console.log("******************** Fin Agregar Usuario ********************");
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
