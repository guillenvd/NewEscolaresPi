<?php
	header('Content-Type: text/html; charset=utf-8');
	$host = 'localhost';
	$user = 'root';
	$pw	  = '';
	$db   = 'escolarespi_db';
		$conn = new mysqli($host,$user,$pw,$db);

		$conn->set_charset("utf8");
		date_default_timezone_set('America/Tijuana');
/*
		if (!$conn) {
		    die(sprintf("[%d] %s\n", mysqli_connect_errno(), mysqli_connect_error()));
		}else{
			echo "conexión exitosamente realizada";
		}
*/

?> 