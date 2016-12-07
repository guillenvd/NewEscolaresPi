<?php 
include("../../dist/php/conexion.php");
$FOLIO = $_POST['folio'];
$sqlGetTurno = "SELECT a.`id`, a.`nombre`, b.`nombre` AS `carrera`, a. `ficha_inscripcion` AS `folio`, a. `indice`FROM `alumnos` a INNER JOIN `carreras` b ON b.id = a.carrera  WHERE a. `ficha_inscripcion` = ".$FOLIO."";
$alumno = array();
	$result = $conn->query($sqlGetTurno); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array('Nombre' =>$row['nombre'],'Carrera' => $row['carrera'],'Fecha' =>$row['indice'],'Folio' =>$row['folio']);
	    }
	}
	else{
	} 
	$conn->close();
	$arrayName = array('infobasica' => $alumno);
	echo json_encode($arrayName);

	//echo json_encode($return_arr);
?>