<?php
    include "config.php";
    $input = file_get_contents('php://input');
    $message = array();

    $id = $_GET['id'];
    $q = mysqli_query($con, "DELETE FROM `user` WHERE 'id' = '{$id}' LIMIT 1 ");
    
    if($q){
        http_response_code(201);
        $message['status'] = "Success";

    }else{
        http_response_code(422);
        $message['status'] = "Error";
    }

    echo json_encode($data);
    echo mysqli_error($con);
?>