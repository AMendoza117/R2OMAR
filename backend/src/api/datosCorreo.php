<?php
include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$idProject = $request->idProject;

// Array para almacenar los datos relacionados con el idProject
$projectData = [];

// Obtener datos de la tabla projects
$sqlProjects = "SELECT * FROM projects WHERE idProject = $idProject";
$resultProjects = mysqli_query($con, $sqlProjects);

if ($resultProjects) {
  $projectData['projects'] = mysqli_fetch_assoc($resultProjects);
} else {
  $errorMessage = "Error al cargar datos del proyecto para idProject: $idProject";
  http_response_code(500);
  echo json_encode(['error' => $errorMessage]);
  exit;
}

// Obtener datos de la tabla responsible
$sqlResponsible = "SELECT email FROM responsible WHERE idResonsible = $idProject"; // Corregido de idResponsible a idResonsible
$resultResponsible = mysqli_query($con, $sqlResponsible);

if ($resultResponsible) {
  $projectData['responsible'] = mysqli_fetch_assoc($resultResponsible);
} else {
  $errorMessage = "Error al cargar datos del responsable para idProject: $idProject";
  http_response_code(500);
  echo json_encode(['error' => $errorMessage]);
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
  $errorMessage = "Error al cargar datos de la actividad para idProject: $idProject";
  http_response_code(500);
  echo json_encode(['error' => $errorMessage]);
  exit;
}

// Obtener datos de la tabla employee
$sqlEmployee = "SELECT * FROM employee WHERE idResonsible = $idProject"; // Corregido de idResponsible a idResonsible
$resultEmployee = mysqli_query($con, $sqlEmployee);

if ($resultEmployee) {
  while ($row = mysqli_fetch_assoc($resultEmployee)) {
    $projectData['employee'][] = $row;
  }
} else {
  $errorMessage = "Error al cargar datos del empleado para idProject: $idProject";
  http_response_code(500);
  echo json_encode(['error' => $errorMessage]);
  exit;
}

// Devolver todos los datos en formato JSON
echo json_encode($projectData);
?>
