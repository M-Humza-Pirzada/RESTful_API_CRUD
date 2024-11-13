<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
// Allow header is header mein hum daikhty hain k hum kn kn s method allow kr rhy hain just for security purpose
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods: POST, Authorization, X-Requested-With"); // X-Requested-With ka matlab h jo data aya ho wo ajax k through hi ho or ya optional h.

$data = json_decode(file_get_contents("php://input"), true);

$std_name = $data['sname'];
$std_class = $data['sclass'];
$std_age = ($data['sage']);
$std_contact = ($data['scontact']);

include('./db_conn.php');

$sql = "INSERT into students (std_name, std_class, std_age, std_contact) VALUES 
    ('{$std_name}', '{$std_class}', '{$std_age}', '{$std_contact}')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array(
        'message' => 'Data Inserted',
        'status' => true
    ));
} else {
    echo json_encode(array(
        'message' => 'Data Not Inserted',
        'status' => false
    ));
}
