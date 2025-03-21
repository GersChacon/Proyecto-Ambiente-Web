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

function getProductById(id) {
    return productos.find(producto => producto.id === id);
}

function loadProduct() {
    const url = new URLSearchParams(window.location.search);
    const productoId = parseInt(url.get('id'));
    const producto = getProductById(productoId);

    if (producto) {
        document.getElementById('producto-imagen').src = producto.imagen;
        document.getElementById('producto-nombre').textContent = producto.nombre;
        document.getElementById('producto-precio').textContent = `$${producto.precio.toFixed(2)}`;
        document.getElementById('producto-descripcion').textContent = producto.descripcion;
    } else {
        document.querySelector('.producto-detalle').innerHTML = '<p>Producto no encontrado.</p>';
    }
}

window.onload = loadProduct;