<?php

include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nombreActividad = $request->nombreCompleto;
$fechaInicio = $request->inicio;
$fechaFin = $request->fin;
$idProyecto = $request->idProyecto;
$responsableActividad = $request->encargado;
$recurso = $request->recurso;

$consulta = "INSERT INTO activity (nameAct, initialDate, finisDate, responsible, idProject)
             VALUES ('$nombreActividad', '$fechaInicio', '$fechaFin', '$responsableActividad', $idProyecto)";

if (mysqli_query($con, $consulta)) {
    // La inserción en 'activity' fue exitosa
    $idActividadInsertada = mysqli_insert_id($con); // Obtener el ID de la actividad insertada

    // Realizar la inserción en 'itemAct'
    $consultaItemAct = "INSERT INTO itemAct (idItem, idAct)
                        VALUES ($recurso, $idActividadInsertada)";

    if (mysqli_query($con, $consultaItemAct)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
    }
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
