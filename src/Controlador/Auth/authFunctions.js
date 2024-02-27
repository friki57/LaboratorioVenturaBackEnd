module.exports = new obj();
function obj() {
    var http = require('./../Rutas/index.js');
    this.verificar = (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.app.locals.usuario.hash == 1) {
                console.log(req.app.locals.usuario)
                return next();
            }
            else {
                res.redirect(http.get.rutaCuenta.verificarCuenta);
            }
        }
        else {
            req.flash("error", "Primero es necesario iniciar sesion");
            res.redirect(http.get.rutaCuenta.inicioSesion);
        }
    }
    this.nada = (req, res, next) => {
        return next();
    }
    this.verificarOperador = (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.tipo == 'Cajero' || req.user.tipo == 'Administrador') {
                return next();
            }
            else {
                req.flash("error", "Es necesario iniciar sesion como Cajero o Administrador");
                res.redirect('back');
            }
        }
        else {
            //  console.log("enlace actual:",req.url);
            req.flash("error", "Primero es necesario iniciar sesion");
            res.redirect('back');
        }
    }
    this.verificarAdmin = (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.tipo == 'Administrador') {
                return next();
            }
            else {
                req.flash("error", "Es necesario iniciar sesion como Administrador");
                res.redirect('back');
            }
        }
        else {
            req.flash("error", "Primero es necesario iniciar sesion");
            res.redirect('back');
        }
    }
}