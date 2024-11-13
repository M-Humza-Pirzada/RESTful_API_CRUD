<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
// Allow header is header mein hum daikhty hain k hum kn kn s method allow kr rhy hain just for security purpose
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods: POST, Authorization, X-Requested-With"); // X-Requested-With ka matlab h jo data aya ho wo ajax k through hi ho or ya optional h. 

// json decode json ko array convert kryga 
$data = json_decode(file_get_contents('php://input'), true); // true is mein associative array return kryga

include('./db_conn.php');

$std_id = $data['sid'];

$sql = "DELETE FROM students WHERE std_id = '{$std_id}'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array(
        'message' => 'Data Deleted',
        'status' => true
    ));
} else {
    echo json_encode(array(
        'message' => 'Data Not Deleted',
        'status' => false
    ));
}
