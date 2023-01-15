import express from "express";
import reqUsuario from "./reqUsuario.js";
import reqPaciente from "./reqPaciente.js";
import reqExamen from "./reqExamen.js";
import reqLaboratorio from "./reqLaboratorio.js";
export default () => {
    const rutas = express.Router();
    reqUsuario(rutas);
    reqPaciente(rutas);
    reqExamen(rutas);
    reqLaboratorio(rutas);
    return rutas;
}


/* var ret = () => {
    const express = require('express');
    const rutas = express.Router();
    const path = require('path');

    var fs = require('fs');
    var archivos = fs.readdirSync('./src/Controlador/HTTP/');
    archivos.map((g) => {
        console.log(g);
        if (g != "index.js")
            require('./' + g)(rutas);
    });

    return rutas;
}

module.exports = ret;
 */