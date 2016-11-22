<?php
	$host = '31.220.104.130';
	$user = 'u657840993_pi';
	$pw	  = 'escolarespi';
	$db   = 'u657840993_newpi';
			$conn = mysqli_connect($host,$user,$pw,$db);
			$conn->set_charset("utf8");
			date_default_timezone_set('America/Tijuana');
//	if (mysqli_connect_errno()){
//			echo"DB False" . mysqli_connect_error();
//		}else{
//			echo"DB True";
//		}

?> 