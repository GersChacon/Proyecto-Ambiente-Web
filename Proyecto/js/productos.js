document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "backend/productos.php";
    let isEditMode = false;
    let editingId;
    let productos = [];

    

    async function loadProducts() {
        try {
            const response = await fetch(API_URL, { method: 'GET', credentials: 'include' });
            if (response.ok) {
                productos = await response.json();
                renderProducts();
            } else {
                if (response.status == 401) {
                    window.location.href = "index.html";
                }
                console.error("Error al obtener productos");
            }
        } catch (err) {
            console.error(err);
        }
    }

    function renderProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        productos.forEach(function (producto) {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4 mb-3';
            productCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        ${producto.imagen_url ? `<img src="../${producto.imagen_url}" class="img-fluid mb-2" alt="${producto.nombre}">` : ''}
                        <p class="card-text">${producto.descripcion || 'Sin descripción'}</p>
                        <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                        <p class="card-text"><strong>Stock:</strong> ${producto.stock_actual}</p>
                        ${producto.caducidad ? `<p class="card-text"><small class="text-muted">Caducidad: ${producto.caducidad}</small></p>` : ''}
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-secondary btn-sm edit-product" data-id="${producto.id_producto}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-product" data-id="${producto.id_producto}">Eliminar</button>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });

        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', handleEditProduct);
        });

        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', handleDeleteProduct);
        });
    }

    function handleEditProduct(event) {
        const productId = parseInt(event.target.dataset.id);
        const producto = productos.find(p => p.id_producto === productId);

        document.getElementById('product-name').value = producto.nombre;
        document.getElementById('product-desc').value = producto.descripcion || '';
        document.getElementById('product-price').value = producto.precio;
        document.getElementById('product-stock').value = producto.stock_actual;
        document.getElementById('existing-image-path').value = producto.imagen_url || '';
        document.getElementById('product-expiry').value = producto.caducidad || '';
        document.getElementById('product-supplier').value = producto.id_proveedor || '';

        isEditMode = true;
        editingId = productId;

        const modal = new bootstrap.Modal(document.getElementById("productModal"));
        modal.show();
    }

    async function handleDeleteProduct(event) {
        const id = parseInt(event.target.dataset.id);
        try {
            const response = await fetch(`${API_URL}?id=${id}`, {
                credentials: 'include',
                method: 'DELETE'
            });
            if (response.ok) {
                loadProducts();
            } else {
                console.error("Problema al eliminar el producto");
            }
        } catch (err) {
            console.error(err);
        }
    }

    document.getElementById('product-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData();
        const imageFile = document.getElementById('product-image').files[0];

        if (imageFile) {
            formData.append('imagen', imageFile);
        }

        formData.append('nombre', document.getElementById('product-name').value);
        formData.append('descripcion', document.getElementById('product-desc').value);
        formData.append('precio', document.getElementById('product-price').value);
        formData.append('stock_actual', document.getElementById('product-stock').value);
        formData.append('caducidad', document.getElementById('product-expiry').value);
        formData.append('id_proveedor', document.getElementById('product-supplier').value);

        try {
            let response;
            if (isEditMode) {
                const productData = {
                    nombre: document.getElementById("product-name").value,
                    descripcion: document.getElementById("product-desc").value,
                    precio: document.getElementById("product-price").value,
                    stock_actual: document.getElementById("product-stock").value,
                    imagen_url: document.getElementById("existing-image-path").value,
                    caducidad: document.getElementById("product-expiry").value,
                    id_proveedor: document.getElementById("product-supplier").value
                };

                response = await fetch(`${API_URL}?id=${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                    credentials: 'include'
                });
            } else {
                response = await fetch(API_URL, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
            }

            if (response.ok) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
                modal.hide();
                loadProducts();
            } else {
                const error = await response.json();
                console.error("Error al guardar:", error);
                alert(`Error: ${error.error || 'Desconocido'}`);
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de conexión");
        }
    });

    document.getElementById('productModal').addEventListener('show.bs.modal', function () {
        if (!isEditMode) {
            document.getElementById('product-form').reset();
            document.getElementById('existing-image-path').value = '';
        }
    });

    document.getElementById("productModal").addEventListener('hidden.bs.modal', function () {
        editingId = null;
        isEditMode = false;
        document.getElementById('product-image').value = '';
    });

    loadProducts();
});