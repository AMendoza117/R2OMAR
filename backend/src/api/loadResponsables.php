<?php
include 'database.php';
header("Content-Type: application/json");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$responsibles = [];

$sql = "SELECT idResonsible, nameRespo FROM responsible"; 
$result = mysqli_query($con, $sql);

if ($result) {
  while ($row = mysqli_fetch_assoc($result)) {
    $responsibles[] = [
      'idResonsible' => $row['idResonsible'],
      'nameRespo' => $row['nameRespo'],
    ];
  }

  echo json_encode($responsibles);
} else {
  http_response_code(500); // Cambiar código de respuesta según sea necesario
  echo json_encode(['error' => 'Error al cargar responsables']);
}
?>