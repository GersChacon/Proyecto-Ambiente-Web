//Simulación de productos en el carrito (esto podría venir de un almacenamiento local o API)
let carrito = [
   { id: 1, nombre: "AB-COLIC", precio: 5000, cantidad: 1 },
  { id: 2, nombre: "Electrolit", precio: 7500, cantidad: 2 },
];

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.innerHTML = ""; // Limpiar la tabla

    let total = 0;

    carrito.forEach(producto => {
        const totalProducto = producto.precio * producto.cantidad;
        total += totalProducto;

        carritoItems.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>₡${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td>₡${totalProducto.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
            </tr>
        `;
    });

    document.getElementById("total-price").textContent = total.toFixed(2);
    document.getElementById("empty-message").style.display = carrito.length === 0 ? "block" : "none";
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    mostrarCarrito();
}

// Función para finalizar la compra
document.getElementById("checkout").addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    } else {
        alert("Proceso de compra finalizado. ¡Gracias por tu compra!");
        carrito = []; // Limpiar el carrito
        mostrarCarrito(); // Actualizar la vista
    }
});

// Mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);