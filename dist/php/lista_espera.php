<?php
/*	Include principal para la conexión a la base de datos*/
include("conexion.php");

$Indice = date("Y-m-d");// Fecha actual, ejemplo 2015-11-03 date("Y-m-d")
$sqlGetLista = "SELECT aspirantes.nombre_completo AS nombre,  alumnos.id AS idAlumno ,aspirantes.carrera AS CarreraNombre, alumnos.turno, alumnos.estado,  alumnos.ficha_inscripcion FROM alumnos LEFT JOIN aspirantes ON ( aspirantes.id_aspi = alumnos.idAspirante) where alumnos.indice='".$Indice."' ";
$return_arr = array();
$array = array();
$result = $conn->query($sqlGetLista); 
	while($row = mysqli_fetch_array($result)) {
		$array = array($row['idAlumno'],$row['nombre'],$row['ficha_inscripcion'],$row['turno'], getEstado($row['estado']),$row['CarreraNombre']);
	    array_push($return_arr,$array);
	}
$conn->close();
	$array = json_encode($return_arr, JSON_UNESCAPED_UNICODE);
	echo $array;



?>