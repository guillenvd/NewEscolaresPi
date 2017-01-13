<?php 
include("../../dist/php/conexion.php");
$FICHA  = $_POST['ficha'];
$ESTADO = $_POST['estado'];
$aspirante = array();

/*CAMBIAR ESTADO DE REVISON DE DOCUMENTOS COMPLETADOS = 2*/
$sqlEstado = "UPDATE `aspirantes` SET `estado`= ".$ESTADO." WHERE `no_ficha` = ".$FICHA."";
	$result = $conn->query($sqlEstado);

/*GENERAR TURNO DEL ASPIRANTE*/
$sqlTurno = "SELECT COUNT(*) as 'turno' FROM `aspirantes` WHERE `estado` =  2";
	$result = $conn->query($sqlTurno);
	    while($row = $result->fetch_assoc()) {
	    	$turno = $row["turno"];
	    }

$sqlEstadoInfo = "SELECT * FROM `aspirantes` WHERE `no_ficha` =  ".$FICHA."";
	$result = $conn->query($sqlEstadoInfo); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$aspirante =  array(
	    		'asNombre' =>$row['nombre_completo'],
	    		'asEstado' =>$row['estado'],
	    		'asFicha'  =>$row['no_ficha'],
	    		'asId'     =>$row['id_aspi'],
	    		'asTurno'  =>$turno
 	    		);
	    }
		echo json_encode($aspirante);
	}
	$conn->close();
?>