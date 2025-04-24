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
            <td>
                <input type="number" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${producto.id}, this.value)">
            </td>
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
    guardarCarrito();
    mostrarCarrito();
}

function actualizarCantidad(id, nuevaCantidad) {
    const cantidad = parseInt(nuevaCantidad);
    if (isNaN(cantidad) || cantidad < 1) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }

    const producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad = cantidad;
        guardarCarrito(); // Guardamos la nueva cantidad
        mostrarCarrito(); // Actualizamos la vista
    }
}

// Función para finalizar la compra
document.getElementById("checkout").addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    } else {
        alert("Proceso de compra finalizado. ¡Gracias por tu compra!");
        carrito = [];
        guardarCarrito(); // Limpiamos el carrito del localStorage
        mostrarCarrito();
    }
});


// Mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}