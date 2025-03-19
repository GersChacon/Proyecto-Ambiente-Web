const productos = [
    {
        imagen: "img/producto1.webp",
        nombre: "Producto 1",
        descripcion: "Descripción",
        precio: 10.00
    },
    {
        imagen: "img/producto2.jpg",
        nombre: "Producto 2",
        descripcion: "Descripción",
        precio: 15.00
    },
    {
        imagen: "img/producto3.jpg",
        nombre: "Producto 3",
        descripcion: "Descripción",
        precio: 20.00
    },
    {
        imagen: "img/producto4.jpg",
        nombre: "Producto 4",
        descripcion: "Descripción",
        precio: 25.00
    }
];

function productoHTML(producto) {
    return `
        <article class="product-item">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="price">$${producto.precio.toFixed(2)}</p>
            <button>Añadir al carrito</button>
        </article>
    `;
}

const productGrid = document.querySelector(".product-grid");

productos.forEach(producto => {
    productGrid.innerHTML += productoHTML(producto);
});