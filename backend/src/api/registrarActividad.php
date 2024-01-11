<?php

include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nombreActividad = $request->nombreActividad;
$fechaInicio = $request->fechaInicio;
$fechaFin = $request->fechaFin;
$idProyecto = $request->idProyecto;
$responsableActividad = $request->responsableActividad;

$consulta = "INSERT INTO activity (nameAct, initialDate, finisDate, responsible, idProject)
             VALUES ('$nombreActividad', '$fechaInicio', '$fechaFin', '$responsableActividad', $idProyecto)";

if (mysqli_query($con, $consulta)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
