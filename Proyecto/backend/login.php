<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre_usuario'] ?? '';
    $contraseña = $_POST['contraseña'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM Usuario WHERE nombre_usuario = :nombre");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($contraseña, $usuario['contraseña'])) {
        echo "Inicio de sesión exitoso";
    } else {
        http_response_code(401);
        echo "Nombre de usuario o contraseña incorrectos";
    }
}

