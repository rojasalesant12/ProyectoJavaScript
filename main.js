//!Calculadora de Impuestos de Juegos en Argentina (Microsoft Store/Steam)

//Tasa de Impuestos Nacionales
let tasaImpuestos = 1.6;

//Función para calcular los impuestos sobre el precio del juego
const calcularImpuesto = (precio) => precio * tasaImpuestos;

//Bucle que permite al usuario ingresar el precio del juego
while (true) {
    //Entrada de datos
    let precioProducto = Number (prompt ("Ingrese el precio del juego a calcular:").replace(",", "."));
    
    //Verificacíon de los datos ingresados
    if (!isNaN (precioProducto) && precioProducto != "") {
        
        //Visualización de los datos ingresados y impuestos a aplicar
        alert (`El precio del juego ingresado es: $${precioProducto.toFixed(2)}`);
        alert ("Impuestos Nacionales aplicados: 60%");

        //Cálculo de los impuestos y visualización del resultado
        const impuestoCalculado = calcularImpuesto (precioProducto);
        alert (`El precio del juego mas los impuestos son: $${impuestoCalculado.toFixed(2)}`);
        
        //Fin del bucle
        break;
    }else
        //Informe al usuario sobre el error
        alert ("Ingrese un precio valido");
}