//*CARRITO DE COMPRAS

let carrito = [];

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(nombre, cantidad, precio) {
  if (cantidad <= 0 || precio <= 0 || isNaN(cantidad) || isNaN(precio)) {
    console.log("Error: Ingrese cantidades y precios válidos.");
    return;
  }
  let total = calcularTotalProducto(cantidad, precio);
  let producto = {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio,
    total: total
  };
  carrito.push(producto); // Agrega el producto al array del carrito
}

// Función para calcular el total de un producto
function calcularTotalProducto(cantidad, precio) {
  return cantidad * precio;
}

// Función para calcular el total del carrito sumando los totales de todos los productos
function calcularTotalCarrito() {
  let totalCarrito = 0;
  for (let producto of carrito) {
    totalCarrito += producto.total;
  }
  return totalCarrito;
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
  console.log("Contenido del carrito:");
  for (let producto of carrito) {
    console.log(`${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio} - Total: $${producto.total}`);
  }
}

// Función para buscar un producto por nombre
function buscarProductoPorNombre(nombre) {
  return carrito.find(producto => producto.nombre === nombre);
}

// Función para filtrar productos por precio máximo
function filtrarProductosPorPrecio(maxPrecio) {
  return carrito.filter(producto => producto.precio <= maxPrecio);
}

// Bucle para agregar productos de forma repetida
let agregarMasProductos = true;

while (agregarMasProductos) {
  let nombreProducto = prompt("Ingrese el nombre del producto:");
  let cantidadProducto = Number(prompt("Ingrese la cantidad del producto:"));
  let precioProducto = Number(prompt("Ingrese el precio unitario del producto:"));

  agregarProductoAlCarrito(nombreProducto, cantidadProducto, precioProducto);

  // Pregunta al usuario si quiere agregar más productos
  let respuesta = prompt("¿Desea agregar más productos al carrito? (Sí/No)").toLowerCase();
  agregarMasProductos = respuesta === "si";
}

// Muestra el contenido final del carrito
mostrarCarrito();

// Calcula y muestra el total del carrito
let totalCarrito = calcularTotalCarrito();
console.log(`Total del carrito: $${totalCarrito}`);

// Pregunta al usuario si quiere buscar un producto por nombre
let realizarBusqueda = prompt("¿Desea buscar un producto por nombre? (Sí/No)").toLowerCase();

if (realizarBusqueda === "si") {
  let nombreBuscado = prompt("Ingrese el nombre del producto que desea buscar:");
  let productoEncontrado = buscarProductoPorNombre(nombreBuscado);

  if (productoEncontrado) {
    console.log(`Producto encontrado: ${productoEncontrado.nombre} - Precio: $${productoEncontrado.precio}`);
  } else {
    console.log("Producto no encontrado.");
  }
}

// Pregunta al usuario si quiere filtrar productos por precio máximo
let realizarFiltrado = prompt("¿Desea filtrar productos por precio máximo? (Sí/No)").toLowerCase();

if (realizarFiltrado === "si") {
  let precioMaximo = Number(prompt("Ingrese el precio máximo para filtrar productos:"));
  let productosFiltrados = filtrarProductosPorPrecio(precioMaximo);

  if (productosFiltrados.length > 0) {
    console.log("Productos filtrados:");
    for (let producto of productosFiltrados) {
      console.log(`${producto.nombre} - Precio: $${producto.precio}`);
    }
  } else {
    console.log("No hay productos que cumplan con el filtro de precio.");
  }
}