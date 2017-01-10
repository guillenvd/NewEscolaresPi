<?php 
include("../../dist/php/conexion.php");
$FICHA  = $_POST['ficha'];
$ESTADO = $_POST['estado'];
$CARRERA= $_POST['carrera'];
$NOMBRE = $_POST['nombre'];
$ID 	= $_POST['id'];

$sqlTurno = "SELECT COUNT(*) as 'Total' FROM `aspirantes` WHERE `estado` =  2";
$count = array();
	$result = $conn->query($sqlTurno); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$count =  array(
	    		'turno' =>$row['Total']
	    		);
	    }
		#$arrayName = array('Turno' => $count);
		echo json_encode($count);
	}
	$conn->close();
?>