<?php
/*	Include principal para la conexión a la base de datos*/
include("conexion.php");
$sqlGetLista = "SELECT * FROM login";
$return_arr = array();
$array = array();
$result = $conn->query($sqlGetLista); 
	while($row = mysqli_fetch_array($result)) {
		$array = $row['nombre'];
	    array_push($return_arr,$array);
	}
$conn->close();
	$json = array("username" =>$array );
	echo json_encode($json);
?>