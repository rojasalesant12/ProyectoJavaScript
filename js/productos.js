  // Event listener para agregar un producto al carrito al hacer clic en el botón "Agregar al Carrito"
  const boxContainer = document.querySelector('.box');
  boxContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('boton-agregar')) {
          const productoElement = event.target.closest('.producto');
          const nombreProducto = productoElement.querySelector('.nombre').textContent;
          const precioProducto = productoElement.querySelector('.precio').textContent;
          const imagenProducto = productoElement.querySelector('img').src;
          const producto = {
              nombre: nombreProducto,
              precio: precioProducto,
              imagen: imagenProducto
          };
          agregarAlCarrito(producto);
      }
  });