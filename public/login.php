<?php

    session_start();

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    include "config.php";

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data->username) && isset($data->password)) {

        $username = $data->username;
        $password = $data->password;
    
        $query = "SELECT * FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
        
        if(mysqli_num_rows($result) > 0) {

            $user = mysqli_fetch_assoc($result);
            
            if(password_verify($password, $user['password'])) {
                echo json_encode(['success' => true, 'message' => 'Login successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
            
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Please provide a username and password']);
    }