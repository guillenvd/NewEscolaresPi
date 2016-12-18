<?php 
include("../../dist/php/conexion.php");
$FICHA = $_POST['ficha'];

$sqlEstado = "UPDATE `aspirantes` SET `estado`= 2 WHERE `no_ficha` = ".$FICHA."";

$conn->close();

?>