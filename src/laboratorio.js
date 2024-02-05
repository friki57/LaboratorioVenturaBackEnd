import { valRef } from "./Utils/valRef.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoDBStore from "connect-mongo";

const app = express();

import cors from "cors";
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    name: 'example.sid',
    secret: 'Replace with your secret key',
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60,
    resave: false,
    saveUninitialized: true,
    store: MongoDBStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/LaboratorioVentura',
        ttl: 60 * 5,
    })
}));
import localStategies from './Controlador/Auth/localStrategies.js';
localStategies(passport);
app.use(passport.initialize());
app.use(passport.session());



mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/LaboratorioVentura", {}, (err, res) => {
    err && console.log("Error al conectar a la Base de Datos", err);
    !err && console.log("Conexión a la Base de Datos exitosa");
});

import rutas from './Controlador/HTTP/index.js';
app.use(rutas());
app.listen(8080, () => {
    console.log("Servidor iniciado en el puerto 8080");
});

// console.log(valRef("1-23", 3));
