<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    require 'config.php';

    $result = $conn->query("SELECT posts.id, posts.content, posts.likes, users.username as user FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC");
    $posts = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($posts);
