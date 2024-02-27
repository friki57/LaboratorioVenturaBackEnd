import passport from "passport";
import passportJWT from 'passport-jwt';
import crudUsuario from '../Cruds/crudUsuario';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'laboratorio',
}, (payload, done) => {
    crudUsuario.buscarUno(payload.id, (user) => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

const authenticateJWT = passport.authenticate('jwt', { session: false });

const authenticateAdmin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permisos de administrador para acceder a esta ruta' });
        }

        req.user = user;
        next();
    })(req, res, next);
};

export default {
    authenticateJWT,
    authenticateAdmin,
};
