<?php 
include("../../dist/php/conexion.php");
$FOLIO = $_POST['folio'];
$sqlGetTurno = "SELECT `id_aspi` as 'ID_ASPIRANTE', `no_ficha` as 'NUMERO_FICHA' , `nombre_completo` as 'NOMBRE_COMPLETO', `carrera` as 'CARRERA' FROM `aspirantes` WHERE `no_ficha` = ".$FOLIO."";

$alumno = array();
	$result = $conn->query($sqlGetTurno); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array(
	    		'asId' =>$row['ID_ASPIRANTE'],
	    		'asFicha' => $row['NUMERO_FICHA'],
	    		'asNombre' =>$row['NOMBRE_COMPLETO'],
	    		'asCarrera' =>$row['CARRERA']);
	    }
		$arrayName = array('infobasica' => $alumno);
		echo json_encode($arrayName);
	}
	$conn->close();

	//echo json_encode($return_arr);
?>