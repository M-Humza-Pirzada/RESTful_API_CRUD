<?php

// ya header file ki type batayega k ks form mein data ja rha h
header('Content-Type: application/json');
// ya optional hoty hain or b hain isky ilawa
header('Acces-Control-Allow-Origin: *'); // (*) iska matlab h koi hamari APIs use kr skta h otherwise kisi ki b ik website ka link add kr skty hain
include('./db_conn.php');

$sql = "SELECT * FROM students";
$result = mysqli_query($conn, $sql) or die("Query Faild");

if (mysqli_num_rows($result) > 0) {
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC); //MYSQLI means data in array form 
    echo json_encode($output);
} else {
    //there is no any data message is in also a json form
    echo json_encode(array(
        'message' => 'No Record Found',
        'status' => false
    ));
}
