<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "escolarespi_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->autocommit(false);
try {
	$conn->query("LOCK TABLES carreras");
	    $conn->query("INSERT INTO users (name) VALUES ('marcus')");
	    $conn->query("UPDATE users SET name = 'jane' WHERE 'id' = 39 ");
	    $sqlUnlock = "unlock tables";
	$conn->query("UNLOCK TABLES");
    $conn->commit();

} catch (Exception $e) {
    $conn->rollback();
    echo 'Something fails: ',  $e->getMessage(), "\n";
}
?>