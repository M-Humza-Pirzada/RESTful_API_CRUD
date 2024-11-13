<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
// Allow header is header mein hum daikhty hain k hum kn kn s method allow kr rhy hain just for security purpose
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods: POST, Authorization, X-Requested-With"); // X-Requested-With ka matlab h jo data aya ho wo ajax k through hi ho or ya optional h.

$data = json_decode(file_get_contents("php://input"), true);

$std_id = $data['sid'];
$std_name = $data['sname'];
$std_class = $data['sclass'];
$std_age = $data['sage'];
$std_contact = $data['scontact'];

include('./db_conn.php');

$sql = "UPDATE students SET std_name = '{$std_name}', std_class = '{$std_class}', std_age = '{$std_age}', std_contact = '{$std_contact}' WHERE std_id = '{$std_id}'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array(
        'message' => 'Data updated',
        'status' => true
    ));
} else {
    echo json_encode(array(
        'message' => 'Data not updated',
        'staus' => false
    ));
}
