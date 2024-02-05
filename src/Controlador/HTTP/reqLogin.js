import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";
import { calcularEdad } from "../../Utils/calcEdad.js";
import { filtrarPacientes } from "../../Utils/filtrar.js";
import passport from 'passport';

export default (rutas) => {
    rutas.post("/login", passport.authenticate("iniciar sesion",
        {
            //successRedirect: '/Usuarios/Cuenta',
            failureRedirect: '/',
            failureFlash: true
        }), (req, res) => {
            console.log(req.user, res.user);
            res.json(req.user);
        }
    );
    rutas.post('/logout', async (req, res, next) => {
        try {
            await req.session.destroy();
        } catch (err) {
            console.error('Error logging out:', err);
            return next(new Error('Error logging out'));
        }
        res.status(200).send();
    })
}
