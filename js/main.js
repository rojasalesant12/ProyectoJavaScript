import { renderizarProductos } from './productos.js';
import { renderizarCarrito, actualizarCarrito } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
  const toggleCartButton = document.getElementById('toggle-cart');
  const carritoContainer = document.querySelector('.carrito-container .carrito');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let productos = [];

  const observarCambiosJSON = () => {
    fetch('./js/productos.json')
      .then(response => response.json())
      .then(datos => {
        if (JSON.stringify(datos) !== JSON.stringify(productos)) {
          productos = datos;
          renderizarProductos(productos);
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos de productos:', error);
      });
  };

  setInterval(observarCambiosJSON, 5000);

  toggleCartButton.addEventListener('click', () => {
    carritoContainer.classList.toggle('mostrar');
  });

  renderizarCarrito(carrito, carritoContainer);

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('boton-agregar')) {
      const productoElement = target.closest('.producto');
      const nombre = productoElement.querySelector('.nombre').textContent;
      const precio = parseInt(productoElement.querySelector('.precio').textContent.replace('$', ''));
      const imagen = productoElement.querySelector('img').src;
      const productoIndex = carrito.findIndex(item => item.nombre === nombre);

      if (productoIndex !== -1) {
        carrito[productoIndex].cantidad++;
      } else {
        carrito.push({
          nombre,
          precio,
          imagen,
          cantidad: 1
        });
      }

      actualizarCarrito(carrito, carritoContainer);
      Swal.fire(
        '¡Producto agregado!',
        '',
        'success'
      );
    }
  });

  carritoContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remover')) {
      const indice = event.target.dataset.indice;
      Swal.fire({
        title: 'Ingrese la cantidad que desea eliminar:',
        input: 'number',
        inputAttributes: {
          min: "1",
          step: "1"
        },
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (cantidad) => {
          if (!cantidad || cantidad <= 0) {
            Swal.showValidationMessage('Ingrese una cantidad válida');
          } else if (cantidad > carrito[indice].cantidad) {
            Swal.showValidationMessage('La cantidad ingresada excede la cantidad en el carrito');
          } else {
            carrito[indice].cantidad -= parseInt(cantidad);
            if (carrito[indice].cantidad === 0) {
              carrito.splice(indice, 1);
            }
            actualizarCarrito(carrito, carritoContainer);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    }
  });

  carritoContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('comprar')) {
      if (carrito.length === 0) {
        Swal.fire(
          'Carrito Vacío',
          'Agrega algunos productos al carrito antes de realizar la compra.',
          'error'
        );
      } else {
        Swal.fire({
          title: '¿Estás seguro de que deseas realizar la compra?',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            carrito = [];
            localStorage.removeItem('carrito');
            renderizarCarrito(carrito, carritoContainer);
            Swal.fire(
              'Compra realizada!',
              'El carrito ha sido vaciado.',
              'success'
            );
          }
        });
      }
    }
  });
});
