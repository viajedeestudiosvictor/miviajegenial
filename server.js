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

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.post('/send-email', (req, res) => {
    const { email, name, total, purchaseCode, delivery, observations, cartItems } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: 'viajedeestudiosvictor@outlook.com', 
            pass: 'AndresZapataRamirez1230' 
        },
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
        from: 'viajedeestudiosvictor@outlook.com',
        to: email,
        cc: 'viajedeestudiosvictor@outlook.com', 
        subject: 'Instrucciones para pagar tu compra',
        text: emailBody,
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el email.');
        }
        res.status(200).send('Email enviado con éxito.');
    });
});


