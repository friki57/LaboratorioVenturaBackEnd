import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";
import { calcularEdad } from "../../Utils/calcEdad.js";
import { filtrarPacientes } from "../../Utils/filtrar.js";
import passport from 'passport';

export default (rutas) => {
    rutas.post("/login", passport.authenticate("iniciar sesion",
        {
            //successRedirect: '/Usuarios/Cuenta',
            failureRedirect: http.get.rutaCuenta.inicioSesion,
            failureFlash: true
        }), (req, res) => {
            console.log(req.user, res.user);
            res.json(req.user);
        }
    );
}
