document.addEventListener("DOMContentLoaded", function() {
    // Array para almacenar productos del carrito
    let carrito = [
        { nombre: "Perfume Mujer 21F Carolina Herrera", cantidad: 1, precio: 12 },
        { nombre: "Sudadera con Gorro Roja", cantidad: 2, precio: 21 }
    ];

    // Función para renderizar los productos del carrito
    function renderCart() {
        const tbody = document.querySelector("#cart-table tbody");
        tbody.innerHTML = "";

        let total = 0;

        carrito.forEach(producto => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}€</td>
                <td>${producto.cantidad * producto.precio}€</td>
            `;

            tbody.appendChild(row);
            total += producto.cantidad * producto.precio;
        });

        document.getElementById("cart-total").textContent = total + "€";
    }

    // Al hacer clic en el botón de pagar
    document.getElementById("pay-button").addEventListener("click", function() {
        const email = document.getElementById("email").value;
        const observaciones = document.getElementById("observations").value;
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');

        if (!email || !deliveryOption) {
            alert("Por favor, completa el correo electrónico y elige una opción de entrega.");
            return;
        }

        const delivery = deliveryOption.value;

        // Generar código único de compra
        const codigoCompra = "COMPRA-" + Math.floor(Math.random() * 1000000);

        // Email de confirmación
        const emailBody = `
            Gracias por tu compra, ${email}.\n
            Código de compra: ${codigoCompra}\n
            Total: ${document.getElementById("cart-total").textContent}\n
            Lugar de entrega: ${delivery}\n
            Observaciones: ${observaciones}\n
            Para realizar el pago a través de Bizum, por favor contacta al número XXXX.\n
            Muchas gracias por tu apoyo.\n
        `;

        // Simulación de envío de email (aquí iría la integración de un servidor de email o API)
        console.log("Enviando correo a: ", email);
        console.log(emailBody);

        // Enviar correo a tu cuenta con los detalles de la compra
        const emailBodyAdmin = `
            Nueva compra realizada.\n
            Email del comprador: ${email}\n
            Código de compra: ${codigoCompra}\n
            Total: ${document.getElementById("cart-total").textContent}\n
            Lugar de entrega: ${delivery}\n
            Observaciones: ${observaciones}\n
        `;
        console.log("Enviando detalles a tu email de administrador:", emailBodyAdmin);
        
        alert("Gracias por tu compra. Revisa tu correo para completar el pago.");
    });

    renderCart();
});
