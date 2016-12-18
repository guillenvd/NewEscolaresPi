<?php 
include("../../dist/php/conexion.php");
$FICHA = $_POST['ficha'];

$sqlEstadoInfo = "SELECT * FROM `aspirantes` WHERE `no_ficha` =  ".$FICHA."";

$alumno = array();
	$result = $conn->query($sqlEstadoInfo); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array(
	    		'asId' =>$row['id_aspi'],
	    		'asFicha' => $row['no_ficha'],
	    		'asNombre' =>$row['nombre_completo'],
	    		'asCarrera' =>$row['carrera'],
	    		'asEstado' =>$row['estado']);
	    }
		$arrayName = array('Estado' => $alumno);
		echo json_encode($arrayName);
	}
	$conn->close();

	//echo json_encode($return_arr);
?>