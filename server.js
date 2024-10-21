const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join('webviaje', 'public')));

app.get('/index', (req, res) => {
    res.sendFile(path.join('webviaje', 'public', 'index.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join('webviaje', 'public', 'carrito.html'));
});
app.get('/productos', (req, res) => {
    res.sendFile(path.join('webviaje', 'public', 'productos.html'));
});

app.listen(PORT, (3000) => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
