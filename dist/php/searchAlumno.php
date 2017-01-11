<?php
/*
	Include principal para la conexión a la base de datos
*/
include("conexion.php");
$Indice = '2015-11-03';//date("Y-m-d");// Fecha actual, ejemplo 2015-12-31 23:59:59

$sqlGetTurno = "SELECT aspirantes.nombre_completo AS nombre,  alumnos.id AS idAlumno ,aspirantes.carrera AS carrera, alumnos.turno, alumnos.estado,  alumnos.ficha_inscripcion ,  alumnos.indice AS indice ,  alumnos.ficha_inscripcion AS ficha FROM alumnos LEFT JOIN aspirantes ON ( aspirantes.id_aspi = alumnos.idAspirante) where alumnos.ficha_inscripcion =".(int)$_GET['Ficha']." order by alumnos.hora_inicio DESC limit 1";
$alumno = array();
$estado = 0;
// ir por cantidad de alumnos
	$result = $conn->query($sqlGetTurno); //ir por los aspirantes del día en curso
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array('Nombre' =>$row['nombre'],'Carrera' => $row['carrera'],'Fecha' =>$row['indice'],'Ficha' =>$row['ficha'],'Turno' => $row['turno'], 'Estado' =>getEstado($row['estado']));
	    }
	} else {
	    $estado = 1;
	}
$conn->close();
	$arrayName = array('estado' => $estado ,'Alumno' => $alumno);
	echo json_encode($arrayName, JSON_UNESCAPED_UNICODE);
?>