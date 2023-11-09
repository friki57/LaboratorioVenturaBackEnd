import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";
import { calcularEdad } from "../../Utils/calcEdad.js";


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
        console.log("******************** Leer Cantidad Usuario ********************\n");
        crudUsuario.buscarTodo((usuarios) => {
            res.json({ cant: usuarios.length })
            console.log("******************** Fin Leer Cantidad Usuario ********************");
        })
    });
    rutas.get("/usuario/leerNombres", async (req, res) => {
        console.log("******************** Leer Nombres Usuario ********************\n");
        crudUsuario.buscarNombres((usuarios) => {
            console.log(usuarios)
            usuarios = usuarios.map((usu) => ({
                ...usu._doc, edad: calcularEdad(usu._doc.Fecha_de_Nacimiento)
            }));
            res.json(usuarios)
            console.log("******************** Fin Leer Nombres Usuario ********************");
        });
    });
    rutas.get("/usuario/leeruno/:id", async (req, res) => {
        console.log("******************** Leer Uno Usuario ********************\n");
        const { id } = req.params;
        crudUsuario.buscarUno(id, (usuario) => {
            res.json(usuario)
            console.log("******************** Fin Leer Uno Usuario ********************");
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
