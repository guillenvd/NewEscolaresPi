<?php
/*	Include principal para la conexión a la base de datos*/
include("conexion.php");
$getDocuments = "SELECT * FROM documentos";
$result = $conn->query($getDocuments); 
$return_arr = array();
$rawdata = array();

while ($row = mysqli_fetch_array($result)) {
	$rawdata = array('Id' =>$row['id'], 'Documento' => $row['documento']);
	array_push($return_arr,$rawdata);

}
$conn->close();
//$array = json_encode($return_arr[0]);
//echo $array;


	$json = array("Documento" =>$return_arr);
	echo json_encode($json);
?>