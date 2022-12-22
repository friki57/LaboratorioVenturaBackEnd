var ret = () => {
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
