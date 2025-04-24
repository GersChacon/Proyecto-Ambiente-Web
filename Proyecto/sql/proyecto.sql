CREATE DATABASE IF NOT EXISTS proyecto;
USE proyecto;

CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock_actual INT NOT NULL,
    imagen_url TEXT,
    caducidad DATE,
    id_proveedor INT,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL
);

CREATE TABLE Venta (
    id_venta INT AUTO_INCREMENT,
    fecha_venta DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    id_cliente INT,
    id_usuario INT,
    PRIMARY KEY (id_venta),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Detalle_Venta (
    id_detalle INT AUTO_INCREMENT,
    id_venta INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_detalle, id_venta),
    FOREIGN KEY (id_venta) REFERENCES Venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Orden (
    id_orden INT AUTO_INCREMENT,
    fecha_orden DATETIME NOT NULL,
    estado VARCHAR(30) NOT NULL,
    id_proveedor INT,
    PRIMARY KEY (id_orden),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

CREATE TABLE Detalle_Orden (
    id_detalle_orden INT AUTO_INCREMENT,
    id_orden INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_detalle_orden, id_orden),
    FOREIGN KEY (id_orden) REFERENCES Orden(id_orden),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

INSERT INTO Proveedor (nombre_empresa, contacto, telefono, email) VALUES
('Laboratorios Avene', 'Dr. François Dupont', '+33 123456789', 'contact@avene.com'),
('Novartis Pharmaceuticals', 'Lic. Ana Rodríguez', '2222-5555', 'info.cr@novartis.com'),
('Kimberly-Clark', 'Ing. Carlos Méndez', '2245-6789', 'ventas@kcc.com'),
('Bayer Costa Rica', 'Dra. Laura Vargas', '2200-1234', 'contacto@bayer.cr'),
('Abbott Nutrition', 'Lic. Sofía Jiménez', '2233-4455', 'cr@abbott.com');

INSERT INTO Producto (nombre, descripcion, precio, stock_actual, imagen_url, caducidad, id_proveedor) VALUES
('Agua termal Avene', 'Agua termal calmante para pieles sensibles', 10000.00, 50, 'img/catalogo-agua-avene.png', '2025-12-31', 1),
('Diovan comprimidos', 'Medicamento para la hipertensión arterial, caja con 30 comprimidos', 13000.00, 30, 'img/catalogo-Diovan-pastillas.jpg', '2024-06-30', 2),
('Pañales Huggies', 'Pañales para bebé talla M, paquete con 36 unidades', 5000.00, 100, 'img/catalogo-pañales-huggies.png', NULL, 3),
('Polvo adhesivo', 'Polvo adhesivo para prótesis dentales, frasco 50g', 7000.00, 25, 'img/Polvo-adhesivo.jpeg', '2024-09-30', 4),
('Sebium gel moussant', 'Gel limpiador facial para piel grasa, 200ml', 8000.00, 40, 'img/catalogo-sebium.jpg', '2025-03-31', 1),
('Sulfato de gentamicina', 'Crema antibiótica tópica, tubo 30g', 6000.00, 35, 'img/catalogo-sulfato-gentamicina.png', '2024-08-31', 4),
('Ensure vainilla', 'Suplemento nutricional sabor vainilla, lata 400g', 3000.00, 60, 'img/catalogo-ensure.png', '2024-05-31', 5),
('Curitas Nextcare', 'Caja con 100 tiritas adhesivas de diferentes tamaños', 2000.00, 80, 'img/catalogo-nextcare.png', NULL, 3),
('Electrolit', 'Bebida hidratante sabor frutas, botella 500ml', 1200.00, 120, 'img/catalogo-electrolit.png', '2024-04-30', 5),
('Alcohol antiséptico', 'Alcohol etílico al 70%, frasco 250ml', 1500.00, 90, 'img/catalogo-alcohol.png', NULL, 4),
('Antiácidos', 'Tabletas masticables para acidez estomacal, caja 12 unidades', 5500.00, 45, 'img/catalogo-antiacido.png', '2025-01-31', 2),
('Crema Goicoechea para diabéticos', 'Crema humectante especial para piel de diabéticos, tubo 120g', 4200.00, 30, 'img/catalogo-goicoechea-diabeticos.png', '2024-11-30', 4);

INSERT INTO Cliente (nombre, apellido, telefono, email) VALUES
('Ana', 'Martínez', '555-111-2222', 'ana.martinez@email.com'),
('Luis', 'Rodríguez', '555-222-3333', 'luis.rodriguez@email.com'),
('Sofía', 'Hernández', '555-333-4444', 'sofia.h@email.com'),
('Miguel', 'Díaz', '555-444-5555', 'miguel.diaz@email.com'),
('Elena', 'Torres', NULL, 'elena.t@email.com');

INSERT INTO Usuario (nombre_usuario, contraseña, rol) VALUES
('admin', 'admin123', 'Administrador'),
('vendedor1', 'ventas2023', 'Vendedor'),
('vendedor2', 'ventas456', 'Vendedor'),
('inventario', 'inv7890', 'Inventario'),
('gerente', 'gerente2023', 'Gerente');

INSERT INTO Venta (fecha_venta, total, metodo_pago, id_cliente, id_usuario) VALUES
('2023-10-01 09:15:00', 1200.00, 'Tarjeta', 1, 2),
('2023-10-01 11:30:00', 28.50, 'Efectivo', 3, 3),
('2023-10-02 14:45:00', 17.25, 'Transferencia', 2, 2),
('2023-10-03 10:00:00', 71.98, 'Tarjeta', 4, 3),
('2023-10-03 16:20:00', 12.75, 'Efectivo', 5, 2);

INSERT INTO Detalle_Venta (id_venta, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 1200.00),
(2, 2, 5, 3.50),
(2, 7, 3, 2.10),
(3, 3, 3, 5.75),
(4, 6, 2, 35.99),
(5, 4, 3, 4.25);

INSERT INTO Orden (fecha_orden, estado, id_proveedor) VALUES
('2023-09-15 08:00:00', 'Entregado', 2),
('2023-09-20 10:30:00', 'Pendiente', 3),
('2023-09-25 14:15:00', 'En camino', 1),
('2023-10-01 09:45:00', 'Cancelado', 4),
('2023-10-02 11:00:00', 'Entregado', 5);

INSERT INTO Detalle_Orden (id_orden, id_producto, cantidad, precio_unitario) VALUES
(1, 2, 50, 3.20),
(1, 7, 30, 1.80),
(2, 1, 10, 1100.00),
(2, 6, 15, 30.00),
(3, 5, 20, 7.50),
(4, 3, 100, 5.00),
(5, 4, 40, 3.80);