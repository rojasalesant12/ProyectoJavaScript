export const renderizarCarrito = (carrito, carritoContainer) => {
  if (!carritoContainer) {
    console.error('Error: carritoContainer no está definido');
    return;
  }
  
  carritoContainer.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
    return;
  }

  carrito.forEach((producto, index) => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto-carrito');
    productoElement.innerHTML = `
      <div class="miniatura">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="info">
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <div class="cantidad-control">
          <button class="restar">-</button>
          <input type="number" value="${producto.cantidad || 1}" min="1" data-indice="${index}" class="cantidad">
          <button class="sumar">+</button>
        </div>
        <button class="remover" data-indice="${index}">Remover</button>
      </div>
    `;
    carritoContainer.appendChild(productoElement);

    total += producto.precio * (producto.cantidad || 1);

    const inputCantidad = productoElement.querySelector('.cantidad');
    const botonSumar = productoElement.querySelector('.sumar');
    const botonRestar = productoElement.querySelector('.restar');

    inputCantidad.addEventListener('change', (event) => {
      carrito[index].cantidad = parseInt(event.target.value);
      actualizarCarrito(carrito, carritoContainer);
    });

    botonSumar.addEventListener('click', () => {
      carrito[index].cantidad += 1;
      actualizarCarrito(carrito, carritoContainer);
    });

    botonRestar.addEventListener('click', () => {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
        actualizarCarrito(carrito, carritoContainer);
      }
    });
  });

  const totalElement = document.createElement('div');
  totalElement.innerHTML = `<p>Total: $${total}</p>`;
  carritoContainer.appendChild(totalElement);

  const comprarButton = document.createElement('button');
  comprarButton.textContent = 'Comprar';
  comprarButton.classList.add('comprar');
  carritoContainer.appendChild(comprarButton);
};

export const actualizarCarrito = (carrito, carritoContainer) => {
  if (!carritoContainer) {
    console.error('Error: carritoContainer no está definido');
    return;
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito(carrito, carritoContainer);
};
