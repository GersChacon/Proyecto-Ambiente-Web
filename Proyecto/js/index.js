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

function comentarioHTML(comentario) {
    return `
        <article class="comment-item">
            <p class="comment-text">"${comentario.texto}"</p>
            <p class="comment-author">- ${comentario.autor}</p>
        </article>
    `;
}

const commentList = document.querySelector(".comment-list");

comentarios.forEach(comentario => {
    commentList.innerHTML += comentarioHTML(comentario);
});

const productos = [
    {
        id: 1,
        imagen: "img/producto1.webp",
        nombre: "Producto 1",
        descripcion: "Descripción",
        precio: 10.00
    },
    {
        id: 2,
        imagen: "img/producto2.jpg",
        nombre: "Producto 2",
        descripcion: "Descripción",
        precio: 15.00
    },
    {
        id: 3,
        imagen: "img/producto3.jpg",
        nombre: "Producto 3",
        descripcion: "Descripción",
        precio: 20.00
    },
    {
        id: 4,
        imagen: "img/producto4.jpg",
        nombre: "Producto 4",
        descripcion: "Descripción",
        precio: 25.00
    }
];

function productoHTML(producto) {
    return `
        <article class="producto-item">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3><a href="producto.html?id=${producto.id}">${producto.nombre}</a></h3>            
            <p>${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <button>Añadir al carrito</button>
        </article>
    `;
}

const productGrid = document.querySelector(".producto-grid");

productos.forEach(producto => {
    productGrid.innerHTML += productoHTML(producto);
});