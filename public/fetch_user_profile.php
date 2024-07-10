<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    session_start();

    include 'config.php';

    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
    
        $query = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $query->bind_param('i', $user_id);
        $query->execute();
        $result = $query->get_result();
    
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            echo json_encode([
                'success' => true,
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'username' => $user['username'],
                'profile_picture' => $user['profile_picture']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not logged in']);
    }