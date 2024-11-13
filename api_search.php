<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

/*
// json decode json ko array convert kryga 
$data = json_decode(file_get_contents('php://input'), true); // true is mein associative array return kryga
$seach_name = $data['search'];

*/

// This is get ya hum url mein id k use krty hain like 'http://localhost/Q_solution/rest_api_php/crud_api_apr/api_search.php?search=humza' ya same method hum single data fetch krny mein  b kr skty hain
$seach_name = isset($_GET['search']) ? $_GET['search'] : die();

include('./db_conn.php');

$sql = "SELECT * FROM students WHERE std_name LIKE '%{$seach_name}%'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($output);
} else {
    echo json_encode(array(
        'message' => 'Data not found',
        'status' => false
    ));
}
