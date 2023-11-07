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
        req.body.Activo = true;
        // req.body.Password = await desencriptarContra(req.body.Password);
        crudUsuario.guardar(req.body,()=>
        {
            res.json({mensaje: "Usuario Registrado con éxito"})
            console.log("******************** Fin Agregar Usuario ********************");
        })
    });
    rutas.get("/usuario/cant", async (req, res) => {
        console.log("******************** Leer Cantidad Paciente ********************\n");
        crudUsuario.buscarTodo((usuarios) => {
            res.json({ cant: usuarios.length })
            console.log("******************** Fin Leer Cantidad Paciente ********************");
        })
    });
    rutas.get("/usuario/leerNombres", async (req, res) => {
        console.log("******************** Leer Nombres Paciente ********************\n");
        crudUsuario.buscarNombres((usuarios) => {
            usuarios = usuarios.map((pac) => ({
                ...pac._doc, edad: calcularEdad(pac._doc.Fecha_de_Nacimiento)
            }));
            res.json(usuarios)
            console.log("******************** Fin Leer Nombres Paciente ********************");
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
