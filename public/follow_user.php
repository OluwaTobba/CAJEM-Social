<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    session_start();

    require 'config.php';

    $data = json_decode(file_get_contents("php://input"));

    if (isset($_SESSION['user_id']) && isset($data->following_id)) {
        $follower_id = intval($_SESSION['user_id']);
        $following_id = intval($data->following_id);
    
        $result = $conn->query("SELECT * FROM follows WHERE follower_id = $follower_id AND following_id = $following_id");
    
        if ($result->num_rows > 0) {
            // Unfollow User
            $conn->query("DELETE FROM follows WHERE follower_id = $follower_id AND following_id = $following_id");
            $isFollowing = false;
        } else {
            // Follow User
            $conn->query("INSERT INTO follows (follower_id, following_id) VALUES ($follower_id, $following_id)");
            $isFollowing = true;
        }
    
        echo json_encode(['success' => true, 'isFollowing' => $isFollowing]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    }

    $conn->close();