// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar el transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Outlook', // Puedes usar 'Gmail', 'Yahoo', etc.
    auth: {
        user: 'viajedeestudiosvictor@outlook.com', // Tu correo de carrito
        pass: 'tu-contraseña', // Tu contraseña o app password si es necesario
    }
});

// Ruta para recibir los datos del carrito y enviar correos
app.post('/send-email', (req, res) => {
    const { email, items, total, delivery, observations } = req.body;

    // Crear el mensaje de correo para el cliente
    const mailOptionsForClient = {
        from: 'viajedeestudiosvictor@outlook.com',
        to: email, // Correo del cliente
        subject: 'Confirmación de compra',
        text: `¡Gracias por tu compra!
        
        Aquí están los detalles de tu pedido:
        Productos: ${items.join(', ')}
        Total: ${total}€
        Opción de entrega: ${delivery}
        Observaciones: ${observations || 'Ninguna'}

        Puedes realizar tu pago mediante Bizum al siguiente número: 123456789. El código de tu compra es: ${Math.floor(Math.random() * 100000)}.
        
        ¡Gracias por tu apoyo!

        Saludos,
        Víctor`
    };

    // Crear el mensaje de correo para ti (administrador)
    const mailOptionsForAdmin = {
        from: 'viajedeestudiosvictor@outlook.com',
        to: 'viajedeestudiosvictor@outlook.com', // Tu correo como administrador
        subject: 'Nueva compra realizada',
        text: `Nueva compra realizada:
        
        Cliente: ${email}
        Productos: ${items.join(', ')}
        Total: ${total}€
        Opción de entrega: ${delivery}
        Observaciones: ${observations || 'Ninguna'}`
    };

    // Enviar correos tanto al cliente como a ti
    transporter.sendMail(mailOptionsForClient, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo al cliente');
        }
        transporter.sendMail(mailOptionsForAdmin, (error, info) => {
            if (error) {
                return res.status(500).send('Error al enviar el correo al administrador');
            }
            res.status(200).send('Correo enviado correctamente');
        });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Sirve los archivos estáticos de la carpeta "public" (donde está tu index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Sirve los archivos estáticos de la carpeta "public" (donde está tu index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
