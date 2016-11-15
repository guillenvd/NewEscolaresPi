<?php
/*
	Include principal para la conexión a la base de datos
*/
include("conexion.php");

$sqlSearchUser  = "SELECT * from login where usuario ='".$_GET['user']."' and password='".$_GET['pass']."'";
$estado = 0;
// validate if the user exists
	$result = $conn->query($sqlSearchUser ); // do query 
	$nums = $result->num_rows;
	if ($result->num_rows > 0) { // fif exist the num of rows going to be 1 
	  	$estado = 1;
	} else {
	    $estado = 0;
	}
$conn->close();
	$arrayName = array('estado' => $estado);
	echo json_encode($arrayName);
?>