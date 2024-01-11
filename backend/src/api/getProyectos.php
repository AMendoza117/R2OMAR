<?php

include 'database.php';

$consulta = "SELECT idProject, nameProject, initialDate, finisDate,  r.nameRespo AS responsible
             FROM projects AS p
             INNER JOIN responsible AS r ON p.idResponsible = r.idResonsible";

$resultado = mysqli_query($con, $consulta);

if ($resultado) {
    $proyectos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'data' => $proyectos]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
