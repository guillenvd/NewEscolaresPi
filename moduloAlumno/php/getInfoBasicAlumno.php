<?php 
include("../../dist/php/conexion.php");

$FOLIO = $_POST['folio'];
$sqlGetTurno = "SELECT a.`id`, a.`nombre`, b.`nombre` AS `carrera`, a. `ficha_inscripcion` AS `folio`, a. `indice`FROM `alumnos` a INNER JOIN `carreras` b ON b.id = a.carrera  WHERE a. `ficha_inscripcion` = ".$FOLIO."";

// "SELECT * FROM alumnos where id = ".$FOLIO."";// WHERE ficha_inscripcion = ".$FOLIO."";

$return_arr = array();
$alumno = array();
	$result = $conn->query($sqlGetTurno); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array('Nombre' =>$row['nombre'],'Carrera' => $row['carrera'],'Fecha' =>$row['indice'],'Folio' =>$row['folio']);
	    	array_push($return_arr,$alumno);
	    }
	}
	else{
	} 
	$conn->close();
		echo json_encode($return_arr);

/*
$folio = $_POST['folio'];
	if($folio == '123')
	echo true;
*/
?>