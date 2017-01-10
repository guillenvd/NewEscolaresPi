<?php
header('Content-type: text/plain; charset=utf-8');
date_default_timezone_set('America/Tijuana');

function getEstado($value) {
	switch ((int)$value) {
 		case 1:
          return 'En espera';
      	case 2:
          return 'Atendido';
      	case 3:
          return 'No se presentó';
	}
}

	/*$host = '31.220.104.130';
	$user = 'u657840993_pi';
	$pw	  = 'escolarespi';
	$db   = 'u657840993_newpi';*/

	$host = 'localhost';
	$user = 'root';
	$pw	  = 'admin';
	$db   = 'escolarespi';

	$conn = new mysqli($host,$user,$pw,$db);

	$conn->set_charset("utf8");


		/*
		 * Use this instead of $connect_error if you need to ensure
		 * compatibility with PHP versions prior to 5.2.9 and 5.3.0.

		if (mysqli_connect_error()) {
		    die('Connect Error (' . mysqli_connect_errno() . ') '
		            . mysqli_connect_error());
		}
		else{	
			echo 'Success... ' . $mysqli->host_info . "\n";

			} */
?> 