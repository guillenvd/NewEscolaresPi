<?php 
include("../../dist/php/conexion.php");

$FOLIO = $_POST['folio'];
$sqlGetTurno = "SELECT * FROM alumnos where id = ".$FOLIO."";// WHERE ficha_inscripcion = ".$FOLIO."";
$return_arr = array();
$alumno = array();
// ir por cantidad de alumnos
	$result = $conn->query($sqlGetTurno); 
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$alumno =  array('Nombre' =>$row['nombre'],'Carrera' => $row['carrera'],'Fecha' =>$row['indice'],'Ficha' =>$row['id']);
	    	array_push($return_arr,$alumno);
	    	
	    }
	    echo json_encode($return_arr);
	}
	else{
		echo false;
	} 
	$conn->close();
	

/*
$folio = $_POST['folio'];
			if($folio == '123')
				echo true;*/
?>