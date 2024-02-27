import { encriptarContra, desencriptarContra } from "../../Utils/encriptacion.js";
import crudUsuario from "../Cruds/crudUsuario.js";
import jwt from 'jsonwebtoken';

export default (rutas) => {
    rutas.post('/login', (req, res) => {
        const { correo, contra } = req.body;
        console.log("iniciar sesion", correo, contra);
        crudUsuario.buscarPorCorreo(correo, (usuario) => {
            console.log("usuario", usuario);
            if (!usuario) {
                res.status(404).json({ message: 'El correo no está registrado' });
            } else {
                console.log('contra:', contra, usuario?.Password);
                const resp = contra === usuario?.Password;
                if (resp) {
                    const token = jwt.sign({ id: usuario._id, usuario }, 'laboratorio', { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                }
            }
        });
    });
}
