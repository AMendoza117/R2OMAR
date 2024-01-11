<?php
include 'database.php';
header("Content-Type: application/json");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$idResonsible = $request->idResonsible;
$employees = [];

$sql = "SELECT idEmplo, nameEmplo, idResonsible FROM employee where idResonsible = $idResonsible"; 
$result = mysqli_query($con, $sql);

if ($result) {
  while ($row = mysqli_fetch_assoc($result)) {
    $employees[] = [
      'idEmplo' => $row['idEmplo'],
      'nameEmplo' => $row['nameEmplo'],
      'idResonsible' => $row['idResonsible'],
    ];
  }

  echo json_encode($employees);
} else {
  http_response_code(500); 
  echo json_encode(['error' => 'Error al cargar responsables']);
}
?>