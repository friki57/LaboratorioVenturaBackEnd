// passport-config.mjs
import LocalStrategy from 'passport-local';

import crudUsuario from '../Cruds/crudUsuario.js';

export default function configurePassport(passport) {
    passport.serializeUser((user, done) => {
        console.log("serializando", user)
        done(null, user._doc._id);
    });

    passport.deserializeUser((id, done) => {
        console.log('desserializando', id);
        crudUsuario.buscarUno(id, (usuario) => {
            console.log('desserializando usuario', usuario);
            if (usuario) {
                done(null, usuario);
            } else {
                done(null, false);
                console.log("no hay este usuario");
            }
        });
    });

    passport.use('iniciar sesion', new LocalStrategy({
        usernameField: 'Email',
        passwordField: 'Password',
        passReqToCallback: true
    }, (req, correo, contra, done) => {
        console.log("iniciar sesion", correo, contra);
        crudUsuario.buscarPorCorreo(correo, (usuario) => {
            console.log("usuario", usuario);
            if (!usuario) {
                return done(null, false, null);
            } else {
                console.log('contra:', contra, usuario?.Password);
                const resp = contra === usuario?.Password;
                if (resp) {
                    req.session.usuario = usuario;
                    req.session.save();
                    console.log('session', req.session)
                    return done(null, usuario, null);
                } else {
                    return done(null, false, null);
                }
            }
        });
    }));
}
