<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$idProject = $request->idProject;

// Llamar al segundo archivo PHP para obtener los resultados
include 'datosCorreo.php';

// Resto del código para enviar el correo
require_once(__DIR__ . "/../lib/PHPMailer/src/PHPMailer.php");
require_once(__DIR__ . "/../lib/PHPMailer/src/Exception.php");
require_once(__DIR__ . "/../lib/PHPMailer/src/SMTP.php");

$to = $projectData['responsible']['email'];
$subject = "Estado de su documento";
$message = "Hola " . $request->gmailPropietario . ",\n\nTu documento ha sido Aceptado. Detalles del proyecto:\n\n";
$message .= "Nombre del proyecto: " . $projectData['projects']['projectName'] . "\n";
$message .= "Responsable: " . $projectData['responsible']['responsibleName'] . "\n";
$message .= "Actividades:\n";

foreach ($projectData['activity'] as $activity) {
    $message .= " - " . $activity['activityName'] . "\n";
}

$remitente = 'arturolopez1997vecino@gmail.com';
$nremitente = 'Impresora';

$mail = new PHPMailer(true);

// Configuración del servidor de correo
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'arturolopez1997vecino@gmail.com';
$mail->Password = 'jcivdngndtyspzrz'; 
$mail->SMTPSecure = 'tls';

// Nuevas configuraciones para CORS
$mail->SMTPKeepAlive = true;
$mail->Timeout = 30;
$mail->SMTPOptions = [
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true,
    ],
];

// Configuración del correo
$mail->setFrom($remitente, $nremitente);
$mail->addReplyTo($remitente, $nremitente);
$mail->addAddress($to);
$mail->isHTML(true);

$mail->Subject = $subject;
$mail->Body = $message;

try {
    $mail->send();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
}
?>
