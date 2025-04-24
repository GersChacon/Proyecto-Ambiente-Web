document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "backend/productos.php";
    const productGrid = document.getElementById('product-grid');

    loadProducts();

    async function loadProducts() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const productos = await response.json();
                renderProducts(productos);
            } else {
                console.error("Error al obtener productos");
                renderSampleProducts();
            }
        } catch (err) {
            console.error(err);
            renderSampleProducts();
        }
    }

    function renderProducts(productos) {
        productGrid.innerHTML = '';

        productos.forEach(producto => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            let imagenUrl = producto.imagen_url
                ? `../${producto.imagen_url}`
                : 'img/default-product.png';

            productItem.innerHTML = `
                <img src="${imagenUrl}" alt="${producto.nombre}" onerror="this.src='img/default-product.png'">
                <h3><a href="producto.html?id=${producto.id_producto}">${producto.nombre}</a></h3>
                <p>${producto.descripcion || 'Descripción no disponible'}</p>
                <div class="price">₡${parseFloat(producto.precio).toFixed(2)}</div>
                <button class="add-to-cart-btn">Añadir al carrito</button>
            `;

            productItem.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                addToCart(producto);
            });

            productGrid.appendChild(productItem);
        });
    }

    function renderSampleProducts() {
        productGrid.innerHTML = `
            <div class="product-item">
                <img src="img/catalogo-agua-avene.png" alt="Agua termal avene">
                <h3>Agua termal avene</h3>
                <p>Agua termal para cuidado de la piel</p>
                <div class="price">₡10.000</div>
                <button class="add-to-cart-btn">Añadir al carrito</button>
            </div>

            <div class="product-item">
                <img src="img/catalogo-Diovan-pastillas.jpg" alt="Diovan comprimidos">
                <h3>Diovan comprimidos</h3>
                <p>Medicamento para la presión arterial</p>
                <div class="price">₡13.000</div>
                <button class="add-to-cart-btn">Añadir al carrito</button>
            </div>
        `;

        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Producto añadido al carrito (modo demo)');
            });
        });
    }

    function addToCart(producto) {
        console.log('Añadiendo al carrito:', producto);
        alert(`Producto ${producto.nombre} añadido al carrito`);

    }
});