<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'rest_api_php';

$conn = mysqli_connect($servername, $username, $password, $dbname) or die("connection faild");

// if ($conn) {
//     echo "Connection Successfull";
// }
// else{
//     die('Connection Faild');
// }
