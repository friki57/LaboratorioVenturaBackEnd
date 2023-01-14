#!/bin/bash

pm2 stop laboratorio
git pull
pm2 start src/laboratorio.js
