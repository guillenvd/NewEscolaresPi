<?php 
include("../../dist/php/conexion.php");
$FICHA = $_POST['ficha'];
$ESTADO = $_POST['estado'];


$sqlEstado = "UPDATE `aspirantes` SET `estado`= ".$ESTADO." WHERE `no_ficha` = ".$FICHA."";
$result = $conn->query($sqlEstado);

$sqlEstadoInfo = "SELECT * FROM `aspirantes` WHERE `no_ficha` =  ".$FICHA."";
$alumno = array();
	$result = $conn->query($sqlEstadoInfo); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array(
	    		'asNombre' =>$row['nombre_completo'],
	    		'asEstado' =>$row['estado']
	    		);
	    }
		$arrayName = array('Estado' => $alumno);
		echo json_encode($arrayName);
	}
	$conn->close();
?>