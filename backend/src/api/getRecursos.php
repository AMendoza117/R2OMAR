<?php
include 'database.php';

$consulta = "SELECT idItem, nameItem
             FROM item";

$resultado = mysqli_query($con, $consulta);

if ($resultado) {
    $item = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    echo json_encode($item);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>