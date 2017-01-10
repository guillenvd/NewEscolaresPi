<?php
/*	Include principal para la conexión a la base de datos*/
include("conexion.php");

$Indice = date("Y-m-d");// Fecha actual, ejemplo 2015-11-03 date("Y-m-d")
$sqlGetLista = "SELECT alumnos.nombre,  alumnos.id AS idAlumno ,carreras.nombre AS CarreraNombre, alumnos.turno, alumnos.estado, alumnos.carrera, alumnos.ficha_inscripcion FROM alumnos LEFT JOIN carreras ON carreras.id = alumnos.carrera";
$return_arr = array();
$array = array();
$result = $conn->query($sqlGetLista); 
	while($row = mysqli_fetch_array($result)) {
		$array = array($row['idAlumno'],$row['nombre'],$row['ficha_inscripcion'],$row['turno'], getEstado($row['estado']),$row['CarreraNombre']);
	    array_push($return_arr,$array);
	}
$conn->close();
	$array = json_encode($return_arr);
	echo $array;



?>