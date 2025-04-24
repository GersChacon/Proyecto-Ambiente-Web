<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre_usuario'] ?? '';
    $contraseña = $_POST['contraseña'] ?? '';
    $rol = 'usuario'; // valor por defecto

    // Verificar si el usuario ya existe
    $check = $pdo->prepare("SELECT * FROM Usuario WHERE nombre_usuario = :nombre");
    $check->bindParam(':nombre', $nombre);
    $check->execute();

    if ($check->rowCount() > 0) {
        http_response_code(400);
        echo "Ese nombre de usuario ya existe";
        exit;
    }

    // Encriptar contraseña
    $hash = password_hash($contraseña, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO Usuario (nombre_usuario, contraseña, rol) VALUES (:nombre, :hash, :rol)");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':hash', $hash);
    $stmt->bindParam(':rol', $rol);

    if ($stmt->execute()) {
        echo "Registro exitoso";
    } else {
        http_response_code(500);
        echo "Error al registrar usuario";
    }
}