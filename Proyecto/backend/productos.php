<?php
require('db.php');

$uploadDir = 'uploads/';
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

function handleFileUpload()
{
    global $uploadDir, $allowedTypes;

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $fileType = $_FILES['imagen']['type'];

        if (in_array($fileType, $allowedTypes)) {
            $fileName = uniqid() . '_' . basename($_FILES['imagen']['name']);
            $targetPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetPath)) {
                return $targetPath;
            }
        }
    }
    return null;
}

function createProduct($nombre, $descripcion, $precio, $stock_actual, $imagen_url, $caducidad, $id_proveedor)
{
    global $pdo;
    try {
        $sql = "INSERT INTO producto (nombre, descripcion, precio, stock_actual, imagen_url, caducidad, id_proveedor) 
                VALUES (:nombre, :descripcion, :precio, :stock_actual, :imagen_url, :caducidad, :id_proveedor)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'precio' => $precio,
            'stock_actual' => $stock_actual,
            'imagen_url' => $imagen_url,
            'caducidad' => $caducidad,
            'id_proveedor' => $id_proveedor
        ]);
        return $pdo->lastInsertId();
    } catch (Exception $e) {
        if ($imagen_url)
            unlink($imagen_url);
        error_log($e->getMessage());
        return 0;
    }
}

function getProducts()
{
    try {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM producto");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo "Error al obtener los productos: " . $ex->getMessage();
        return [];
    }
}

function editProduct($id_producto, $nombre, $descripcion, $precio, $stock_actual, $imagen_url, $caducidad, $id_proveedor)
{
    global $pdo;
    try {
        $sql = "UPDATE producto SET nombre = :nombre, descripcion = :descripcion, precio = :precio, 
                stock_actual = :stock_actual, imagen_url = :imagen_url, caducidad = :caducidad, 
                id_proveedor = :id_proveedor WHERE id_producto = :id_producto";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'precio' => $precio,
            'stock_actual' => $stock_actual,
            'imagen_url' => $imagen_url,
            'caducidad' => $caducidad,
            'id_proveedor' => $id_proveedor,
            'id_producto' => $id_producto
        ]);
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        echo $e->getMessage();
        return false;
    }
}

function deleteProduct($id_producto)
{
    global $pdo;
    try {
        $sql = "DELETE FROM producto WHERE id_producto = :id_producto";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(["id_producto" => $id_producto]);
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        echo $e->getMessage();
        return false;
    }
}

function validateInput($input)
{
    if (isset($input['nombre'], $input['precio'], $input['stock_actual'])) {
        return true;
    }
    return false;
}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

function getJsonInput()
{
    return json_decode(file_get_contents("php://input"), true);
}

session_start();

if (isset($_SESSION["user_id"])) {
    try {
        switch ($method) {
            case 'GET':
                if (isset($_GET['id'])) {
                    $stmt = $pdo->prepare("SELECT * FROM producto WHERE id_producto = :id");
                    $stmt->execute(['id' => $_GET['id']]);
                    $producto = $stmt->fetch(PDO::FETCH_ASSOC);
                    echo json_encode($producto ? [$producto] : []);
                } else {
                    $productos = getProducts();
                    echo json_encode($productos);
                }
                break;

            case 'POST':
                $imagen_url = null;

                if (!empty($_FILES)) {
                    $imagen_url = handleFileUpload();
                    $input = $_POST;
                } else {
                    $input = getJsonInput();
                    if (isset($input['imagen_url'])) {
                        $imagen_url = $input['imagen_url'];
                    }
                }

                if (isset($input['nombre'], $input['precio'], $input['stock_actual'])) {
                    $idProducto = createProduct(
                        $input['nombre'],
                        $input['descripcion'] ?? null,
                        $input['precio'],
                        $input['stock_actual'],
                        $imagen_url,
                        $input['caducidad'] ?? null,
                        $input['id_proveedor'] ?? null
                    );

                    if ($idProducto > 0) {
                        http_response_code(201);
                        echo json_encode(["message" => "Producto creado", "id" => $idProducto, "imagen_url" => $imagen_url]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['error' => "Error al crear producto"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Datos insuficientes"]);
                }
                break;

            case 'PUT':
                $input = getJsonInput();
                if (validateInput($input) && isset($_GET['id'])) {
                    if (
                        editProduct(
                            $_GET['id'],
                            $input['nombre'],
                            $input['descripcion'] ?? null,
                            $input['precio'],
                            $input['stock_actual'],
                            $input['imagen_url'] ?? null,
                            $input['caducidad'] ?? null,
                            $input['id_proveedor'] ?? null
                        )
                    ) {
                        http_response_code(200);
                        echo json_encode(['message' => "Producto actualizado"]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['error' => "Error"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Datos insuficientes']);
                }
                break;

            case 'DELETE':
                if (isset($_GET['id'])) {
                    if (deleteProduct($_GET['id'])) {
                        http_response_code(200);
                        echo json_encode(['message' => "Producto eliminado"]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['error' => "Error"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => "ID no proporcionado"]);
                }
                break;

            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
        }
    } catch (Exception $exp) {
        http_response_code(500);
        echo json_encode(['error' => "Error" . $exp->getMessage()]);
    }
} else {
    http_response_code(401);
    echo json_encode(["error" => "Sesión no activa"]);
}