let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderizarCarrito() {
    const carritoContainer = document.querySelector('.carrito');
    carritoContainer.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto-carrito');
        productoElement.innerHTML = `
            <div class="miniatura">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="info">
                <p>${producto.nombre}</p>
                <p>Precio: ${producto.precio}</p>
                <input type="number" value="${producto.cantidad || 1}" min="1" data-indice="${index}" class="cantidad">
                <button class="remover" data-indice="${index}">Remover</button>
            </div>
        `;
        carritoContainer.appendChild(productoElement);

        total += parseInt(producto.precio.replace('$', '')) * (producto.cantidad || 1);

        const inputCantidad = productoElement.querySelector('.cantidad');
        inputCantidad.addEventListener('change', (event) => {
            carrito[index].cantidad = parseInt(event.target.value);
            actualizarCarrito();
        });
    });

    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<p>Total: $${total}</p>`;
    carritoContainer.appendChild(totalElement);
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}

function removerDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
    const carritoContainer = document.querySelector('.carrito');
    carritoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remover')) {
            const indice = parseInt(event.target.dataset.indice);
            removerDelCarrito(indice);
        }
    });
});

// Llamar a la función para renderizar el carrito al cargar la página
renderizarCarrito();
