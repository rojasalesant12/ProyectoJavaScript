document.addEventListener('DOMContentLoaded', function() {
  const toggleCartButton = document.getElementById('toggle-cart');
  const carritoContainer = document.querySelector('.carrito');

  toggleCartButton.addEventListener('click', () => {
      carritoContainer.classList.toggle('mostrar');
  });
});
