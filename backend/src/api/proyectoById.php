<?php
include 'database.php';
header("Content-Type: application/json");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$idProject = $request->idProject;
$idProject = $_GET['idProject'];

// Array para almacenar los datos relacionados con el idProject
$projectData = [];

// Obtener datos de la tabla projects
$sqlProjects = "SELECT * FROM projects WHERE idProject = $idProject";
$resultProjects = mysqli_query($con, $sqlProjects);

if ($resultProjects) {
  $projectData['projects'] = mysqli_fetch_assoc($resultProjects);
} else {
  http_response_code(500); 
  echo json_encode(['error' => 'Error al cargar datos del proyecto']);
  exit;
}

// Obtener datos de la tabla responsible
$sqlResponsible = "SELECT * FROM responsible WHERE idResonsible = $idProject";
$resultResponsible = mysqli_query($con, $sqlResponsible);

if ($resultResponsible) {
  $projectData['responsible'] = mysqli_fetch_assoc($resultResponsible);
} else {
  http_response_code(500); 
  echo json_encode(['error' => 'Error al cargar datos del responsable']);
  exit;
}

// Obtener datos de la tabla activity
$sqlActivity = "SELECT * FROM activity WHERE idProject = $idProject";
$resultActivity = mysqli_query($con, $sqlActivity);

if ($resultActivity) {
  while ($row = mysqli_fetch_assoc($resultActivity)) {
    $projectData['activity'][] = $row;
  }
} else {
  http_response_code(500); 
  echo json_encode(['error' => 'Error al cargar datos de la actividad']);
  exit;
}

// Obtener datos de la tabla employee
$sqlEmployee = "SELECT * FROM employee WHERE idResonsible = $idProject";
$resultEmployee = mysqli_query($con, $sqlEmployee);

if ($resultEmployee) {
  while ($row = mysqli_fetch_assoc($resultEmployee)) {
    $projectData['employee'][] = $row;
  }
} else {
  http_response_code(500); 
  echo json_encode(['error' => 'Error al cargar datos del empleado']);
  exit;
}

// Devolver todos los datos en formato JSON
echo json_encode($projectData);
?>
