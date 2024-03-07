export const renderizarProductos = (productos) => {
  const productosContainers = document.querySelectorAll('.container');

  productos.forEach((producto, index) => {
    const productoContainer = productosContainers[index];

    if (productoContainer) {
      const { imagen, nombre, precio } = producto;
      const imagenElement = productoContainer.querySelector('img');
      const nombreElement = productoContainer.querySelector('.nombre');
      const precioElement = productoContainer.querySelector('.precio');
      const botonComprarElement = productoContainer.querySelector('.boton-comprar');
      const botonAgregarElement = productoContainer.querySelector('.boton-agregar');

      imagenElement.src = imagen;
      imagenElement.alt = nombre;
      nombreElement.textContent = nombre;
      precioElement.textContent = `$${precio}`;
      botonComprarElement.textContent = 'Comprar';
      botonAgregarElement.textContent = 'Agregar al Carrito';
    }
  });
};
