<?php

include 'database.php';

$consulta = "SELECT * FROM recursos"; 

$resultado = mysqli_query($con, $consulta);

if ($resultado) {
    $recursos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'data' => $recursos]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
