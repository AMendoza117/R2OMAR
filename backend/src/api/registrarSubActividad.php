<?php

include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nameSub = $request->nameSub;
$nameRes = $request->nameRes;
$idAct = $request->idAct;

// Insertar subactividad
$consultaSubact = "INSERT INTO subactivity (nameSub, nameRes, idAct) VALUES (?, ?, ?)";

$stmt = mysqli_prepare($con, $consultaSubact);
mysqli_stmt_bind_param($stmt, 'ssi', $nameSub, $nameRes, $idAct);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_stmt_error($stmt), 'query' => $consultaSubact]);
}

mysqli_stmt_close($stmt);
$con->close();

?>
