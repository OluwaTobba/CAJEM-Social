<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    include 'config.php';

    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->userId) && isset($data->content)) {

        $user_id = $data->userId;
        $content = $data->content;

        $query = "INSERT INTO posts (user_id, content) VALUES ('$user_id', '$content')";

        if (mysqli_query($conn, $query)) {
            echo json_encode(['success' => true, 'message' => 'Post created successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error creating post.', 'error' => $conn->error]);
        }
        
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    }