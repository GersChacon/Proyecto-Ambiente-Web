document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "backend/productos.php";

    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    if (productoId) {
        loadProduct(productoId);
    } else {
        showError("Producto no especificado");
    }

    document.querySelector('.add-to-cart').addEventListener('click', addToCart);

    async function loadProduct(id) {
        try {
            console.log("Buscando producto con ID:", id);

            const response = await fetch(`${API_URL}?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            });

            console.log("Respuesta:", response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`Error${response.status}`);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);

            const producto = Array.isArray(data) ? data[0] : data;

            if (producto) {
                displayProduct(producto);
            } else {
                showError("Error");
            }
        } catch (error) {
            console.error("Error", error);
            showError("Error");
        }
    }

    function displayProduct(producto) {
        console.log("Mostrando producto:", producto);

        const imagenUrl = producto.imagen_url
            ? producto.imagen_url.startsWith('uploads/')
                ? `../${producto.imagen_url}`
                : producto.imagen_url
            : 'img/default-product.png';

        console.log("URL de imagen:", imagenUrl);

        const imgElement = document.getElementById('producto-imagen');
        imgElement.src = imagenUrl;
        imgElement.alt = producto.nombre;

        imgElement.onerror = function () {
            console.error("Error cargando imagen:", imagenUrl);
            this.src = 'img/default-product.png';
        };

        document.getElementById('producto-nombre').textContent = producto.nombre || 'Nombre no disponible';
        document.getElementById('producto-precio').textContent = producto.precio
            ? `₡${parseFloat(producto.precio).toFixed(2)}`
            : 'Precio no disponible';
        document.getElementById('producto-descripcion').textContent = producto.descripcion || 'Descripción no disponible';
    }

    function addToCart() {
        alert('Producto añadido al carrito');
    }

    function showError(message) {
        console.error(message);
        document.querySelector('.producto-detalle').innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <a href="catalogo.html">Volver al catálogo</a>
            </div>
        `;
    }
});