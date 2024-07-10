<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    require 'config.php';

    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->post_id)) {
        $post_id = intval($data->post_id);

        $query = "UPDATE posts SET likes = likes + 1 WHERE id = $post_id";

        if ($conn->query($query) === TRUE) {

            $result = $conn->query("SELECT likes FROM posts WHERE id = $post_id");
            $row = $result->fetch_assoc();
            echo json_encode(['success' => true, 'likes' => $row['likes']]);

        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating likes: ' . $conn->error]);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    }

    $conn->close();
