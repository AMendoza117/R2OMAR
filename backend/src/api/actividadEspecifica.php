<?php

include 'database.php';

$idActividad = $_GET['idActividad']; 

$consulta = "SELECT idSubAct, nameSub
             FROM subactivity
             WHERE idAct = $idActividad";

$resultado = mysqli_query($con, $consulta);

if ($resultado) {
    $subactividades = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'data' => $subactividades]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
