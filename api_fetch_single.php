<?php
header('Content-Type: application/json');
header('Acces-Control-Allow-Origin: *');

// json decode json ko array convert kryga 
$data = json_decode(file_get_contents('php://input'), true); // true is mein associative array return kryga

include(".//db_conn.php");

$student_id = $data['sid']; // this sid is not a database id ya sid ik key hain iska andar hmy std_id ko save kya h

$sql = "SELECT * FROM students WHERE std_id = {$student_id}";

$result = mysqli_query($conn, $sql) or die("Query faild");

if (mysqli_num_rows($result) > 0) {
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($output);
} else {
    //there is no any data message is in also a json form
    echo json_encode(array(
        'message' => 'No Record Found',
        'status' => false
    ));
}
