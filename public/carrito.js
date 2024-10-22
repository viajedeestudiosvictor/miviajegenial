
const cartItemsDiv = document.getElementById('cart-items');
const totalPriceSpan = document.getElementById('total-price');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

if (addToCartButtons) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.parentElement;
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('€', ''));

            cartItems.push({ name: productName, price: productPrice });
            updateCart();

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            alert(`${productName} añadido al carrito`);
        });
    });
}

function updateCart() {
    if (cartItemsDiv && totalPriceSpan) {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <p>${item.name}: ${item.price}€</p>
                <button onclick="removeItem(${index})">Quitar</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
            total += item.price;
        });
        totalPriceSpan.textContent = total.toFixed(2);
    }
}

function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const delivery = document.querySelector('input[name="delivery"]:checked').value;
        const observations = document.getElementById('observations').value;
        const total = totalPriceSpan.textContent;
        const purchaseCode = generatePurchaseCode();

        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
                total,
                purchaseCode,
                delivery,
                observations,
                cartItems,
            }),
        });

        if (response.ok) {
            alert('Email enviado con éxito. Revisa tu correo para las instrucciones de pago.');
        } else {
            alert('Hubo un error al enviar el email. Inténtalo de nuevo.');
        }
    });
}

function generatePurchaseCode() {
    return 'COMPRA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

updateCart();
