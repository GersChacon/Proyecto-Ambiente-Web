document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "backend/productos.php";
    const productGrid = document.querySelector(".producto-grid");
    const commentList = document.querySelector(".comment-list");

    const comentarios = [
        {
            texto: "Excelente servicio",
            autor: "Gerson Chacon"
        },
        {
            texto: "Los productos llegaron rápido",
            autor: "Ana Hernandez"
        },
        {
            texto: "Muy buena atención al cliente",
            autor: "Fabian Retana"
        }
    ];

    function mostrarComentarios() {
        comentarios.forEach(comentario => {
            const commentHTML = `
                <article class="comment-item">
                    <p class="comment-text">"${comentario.texto}"</p>
                    <p class="comment-author">- ${comentario.autor}</p>
                </article>
            `;
            commentList.innerHTML += commentHTML;
        });
    }

    function productoHTML(producto) {
        const imagenUrl = producto.imagen_url
            ? producto.imagen_url.startsWith('uploads/')
                ? `../${producto.imagen_url}`
                : producto.imagen_url
            : 'img/default-product.png';

        return `
            <article class="producto-item">
                <img src="${imagenUrl}" alt="${producto.nombre}" onerror="this.src='img/default-product.png'">
                <h3><a href="producto.html?id=${producto.id_producto}">${producto.nombre}</a></h3>
                <p>${producto.descripcion || 'Descripción no disponible'}</p>
                <p class="precio">₡${parseFloat(producto.precio).toFixed(2)}</p>
                <button class="add-to-cart-btn">Añadir al carrito</button>
            </article>
        `;
    }

    async function cargarProductos() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const productos = await response.json();
                mostrarProductos(productos);
            } else {
                console.error("Error al obtener productos");
                mostrarProductosDemo();
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    function mostrarProductos(productos) {
        productGrid.innerHTML = '';

        const productosDestacados = productos.slice(0, 4);

        productosDestacados.forEach(producto => {
            productGrid.innerHTML += productoHTML(producto);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Producto añadido al carrito');
            });
        });
    }

    mostrarComentarios();
    cargarProductos();
});