<?php 
include("../../dist/php/conexion.php");
$FICHA  = $_GET['asFicha'];
$EST_DOC= $_GET['asEstado'];
$NOMBRE = $_GET['asNombre'];
$ID 	= $_GET['asId'];
$TURNO  = $_GET['asTurno'];


$Date = date("Y-m-d H:i:s");// Fecha actual, ejemplo 2015-12-31 23:59:59
$Indice = date("Y-m-d");// Fecha actual, ejemplo 2015-12-31 23:59:59
$promedioTiempo=0; //Declaración de la variable del tiempo estimado

$sqlGetprom = "SELECT * FROM alumnos where indice ='".$Indice."'"; //Query para selecionar a todos los alumnos atendidos
$sqlCoutn = "SELECT COUNT(turno) as atendidos FROM alumnos where estado = 2 and indice ='".$Indice."'"; //Query para contar a los alumnos atendidos

// Verificar el tiempo promedio para el alumno
	$result = $conn->query($sqlCoutn); //Ejecutar Query $sqlCoutn
    while($row = $result->fetch_assoc()) {
    	// si existen como minimo dos alumnos atendidos hoy
        if ($row["atendidos"] >= 2){
        	//si hay más de dos se genera una suma de los minutos que tardaron en ser atendidos
        	// mediante el query de seleccion todos lo atnedidos hoy
        	$sumaProm =0;
        	$resultProm = $conn->query($sqlGetprom);
		    while($rowAtendidos = $resultProm->fetch_assoc()){
				if($rowAtendidos['hora_fin'] != '0000-00-00 00:00:00'){	    	
			    	$time1 =  new DateTime($rowAtendidos['hora_inicio']);
			    	$time2 =  new DateTime($rowAtendidos['hora_fin']);
			        $suma = $time1->diff($time2); // tiempo que tardó en ser atendido x alumno
			        $sumaProm += (int)$suma->format('%i'); //Acumolador de tiempo estimado.
			    }
			    else{
			        $sumaProm += (int)$rowAtendidos['tiempo_estimado']; 
			    }
		    }
		    $promedioTiempo=ceil( $sumaProm  / $resultProm->num_rows) ; //promedio de todos los tiempos, se redondea a su entero más proximo
        }
        else{
        	//sino se asigna un tiempo default, en este caso 11 minutos
        	$promedioTiempo = 11;
        }
    }

	$sql = "INSERT INTO `alumnos`(`turno`, `hora_inicio`, `tiempo_estimado`, `estado`, `ficha_inscripcion`, `indice`, `id_docreq`, `idAspirante`)	VALUES (".$TURNO.",'".$Date."', '".$promedioTiempo."', 1, '".$FICHA."', '".$Indice."', '".$EST_DOC."', '".$ID."' );";
	if ($conn->query($sql) === TRUE) {
		$bandera =1;
	}
	else {
		$bandera = 0;
	}

	$json = array("key1" => $bandera,"tiempo" =>$promedioTiempo,"turno" =>$TURNO);
	echo json_encode($json);
	$conn->close();
?>