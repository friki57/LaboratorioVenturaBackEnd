import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";
import jwt from 'jsonwebtoken';
import auth from '../Auth/jwt.js'

export default (rutas) => {
    rutas.post('/login', (req, res) => {
        const { Email, Password } = req.body;
        console.log("iniciar sesion", req.body, Email, Password);
        crudUsuario.buscarPorCorreo(Email, (usuario) => {
            console.log("usuario", usuario);
            if (!usuario) {
                res.status(404).json({ message: 'El Email no está registrado' });
            } else {
                console.log('Password:', Password, usuario?.Password);
                const resp = Password === usuario?.Password;
                if (resp) {
                    const token = jwt.sign({ id: usuario._id, usuario }, 'laboratorio', { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                }
            }
        });
    });
    rutas.get('/getUser', auth.authenticateJWT, (req, res) => {
        const user = req.user;
        res.json(user);
    });
}
