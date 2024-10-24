require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carrito.html'));
});

app.post('/send-email', (req, res) => {
    const { email, name, total, purchaseCode, delivery, observations, cartItems } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const emailBody = `
        ¡Gracias por tu colaboración, ${name}!
        Monto total: ${total}€
        Código de compra: **${purchaseCode}**

        Instrucciones para pago por Bizum: 632051554
        Por favor, realiza un Bizum a este número indicando en el motivo de pago tu nombre y apellidos junto con el código de compra.

        Lugar de entrega: ${delivery}
        Observaciones: ${observations}
        Detalle de productos:
        ${cartItems.map(item => `- ${item.name}: ${item.price}€`).join('\n')}
        
        **Nos pondremos en contacto contigo para ultimar la entrega.**
        Y de nuevo, **¡Gracias por no dejarme tirado en la carretera!**
    `;

    const emailOptions = {
        from: 'viajedeestudiosvictor@gmail.com',
        to: email,
        cc: 'viajedeestudiosvictor@gmail.com',
        subject: 'Instrucciones para pagar tu compra',
        text: emailBody,
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el email:', error);
            return res.status(500).send('Error al enviar el email.');
        } else {
            console.log('Email enviado: ' + info.response);
            return res.status(200).send('Email enviado con éxito.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
