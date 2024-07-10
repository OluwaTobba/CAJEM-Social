<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    include "config.php";

    $response = [];

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $firstName = $conn->real_escape_string($_POST['first_name']);
        $lastName = $conn->real_escape_string($_POST['last_name']);
        $email = $conn->real_escape_string($_POST['email']);
        $username = $conn->real_escape_string($_POST['username']);
        $password = $conn->real_escape_string($_POST['password']);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $profilePicture = '';
        if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] == 0) {
            $profilePicture = "uploads/" . basename($_FILES['profile_picture']['name']);
            move_uploaded_file($_FILES['profile_picture']['tmp_name'], $profilePicture);
        }

        $sql = "INSERT INTO users (first_name, last_name, email, username, password, profile_picture) 
                VALUES ('$firstName', '$lastName', '$email', '$username', '$hashedPassword', '$profilePicture')";

        if ($conn->query($sql) === TRUE) {
            $response['status'] = 'success';
            $response['message'] = 'New record created successfully';
        } else {
            $response['status'] = 'error';
            $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
        }

    }

    echo json_encode($response);

    $conn->close();
