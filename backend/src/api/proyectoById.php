<?php
/*include 'database.php';
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
*/


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

if (!$resultProjects) {
  $error_message = mysqli_error($con);
  http_response_code(500);
  echo json_encode(['error' => 'Error al cargar datos del proyecto: ' . $error_message]);
  exit;
}

$projectData['projects'] = mysqli_fetch_assoc($resultProjects);

// Obtener datos de la tabla responsible
$sqlResponsible = "SELECT * FROM responsible WHERE idResonsible = " . $projectData['projects']['idResponsible'];
$resultResponsible = mysqli_query($con, $sqlResponsible);

if (!$resultResponsible) {
  $error_message = mysqli_error($con);
  http_response_code(500);
  echo json_encode(['error' => 'Error al cargar datos del responsable: ' . $error_message]);
  exit;
}

$projectData['responsible'] = mysqli_fetch_assoc($resultResponsible);

// Obtener datos de la tabla activity
$sqlActivity = "SELECT * FROM activity WHERE idProject = $idProject";
$resultActivity = mysqli_query($con, $sqlActivity);

if (!$resultActivity) {
  $error_message = mysqli_error($con);
  http_response_code(500);
  echo json_encode(['error' => 'Error al cargar datos de la actividad: ' . $error_message]);
  exit;
}

while ($row = mysqli_fetch_assoc($resultActivity)) {
  // Obtener datos de la tabla itemAct para cada actividad
  $sqlItemAct = "SELECT * FROM itemAct WHERE idAct = " . $row['idAcitvity'];
  $resultItemAct = mysqli_query($con, $sqlItemAct);

  if (!$resultItemAct) {
    $error_message = mysqli_error($con);
    http_response_code(500);
    echo json_encode(['error' => 'Error al cargar datos de itemAct: ' . $error_message]);
    exit;
  }

  while ($itemActRow = mysqli_fetch_assoc($resultItemAct)) {
    // Obtener datos de la tabla item para cada itemAct
    $sqlItem = "SELECT * FROM item WHERE idItem = " . $itemActRow['idItem'];
    $resultItem = mysqli_query($con, $sqlItem);

    if (!$resultItem) {
      $error_message = mysqli_error($con);
      http_response_code(500);
      echo json_encode(['error' => 'Error al cargar datos de item: ' . $error_message]);
      exit;
    }

    $itemActRow['item'] = mysqli_fetch_assoc($resultItem);
    $row['itemAct'][] = $itemActRow;
  }

  // Obtener datos de la tabla subactivity para cada actividad
  $sqlSubactivity = "SELECT * FROM subactivity WHERE idAct = " . $row['idAcitvity'];
  $resultSubactivity = mysqli_query($con, $sqlSubactivity);

  if (!$resultSubactivity) {
    $error_message = mysqli_error($con);
    http_response_code(500);
    echo json_encode(['error' => 'Error al cargar datos de subactivity: ' . $error_message]);
    exit;
  }

  while ($subactivityRow = mysqli_fetch_assoc($resultSubactivity)) {
    $row['subactivity'][] = $subactivityRow;
  }

  $projectData['activity'][] = $row;
}

// Obtener datos de la tabla employee
$sqlEmployee = "SELECT * FROM employee WHERE idResonsible = " . $projectData['projects']['idResponsible'];
$resultEmployee = mysqli_query($con, $sqlEmployee);

if (!$resultEmployee) {
  $error_message = mysqli_error($con);
  http_response_code(500);
  echo json_encode(['error' => 'Error al cargar datos del empleado: ' . $error_message]);
  exit;
}

while ($row = mysqli_fetch_assoc($resultEmployee)) {
  $projectData['employee'][] = $row;
}

// Devolver todos los datos en formato JSON
echo json_encode($projectData);
?>
