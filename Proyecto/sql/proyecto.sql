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
    imagen_url VARCHAR(255),
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