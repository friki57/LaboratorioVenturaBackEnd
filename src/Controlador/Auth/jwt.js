import passport from "passport";
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import crudUsuario from '../Cruds/crudUsuario.js';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'laboratorio',
}, (payload, done) => {
    console.log('payload', payload)
    crudUsuario.buscarUno(payload.id, (user) => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, -1);
        }
    });
}));

const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        const token = req.headers.authorization.split(' ')[1];
        console.log(user, token)
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        jwt.verify(token, 'laboratorio', (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            } else if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }
            req.user = user;
            next();
        });
    })(req, res, next);
};

const authenticateAdmin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        const token = req.headers.authorization.split(' ')[1];
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        jwt.verify(token, 'laboratorio', (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            } else if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos de administrador para acceder a esta ruta' });
            }
            req.user = user;
            next();
        });
    })(req, res, next);
};

export default {
    authenticateJWT,
    authenticateAdmin,
};
