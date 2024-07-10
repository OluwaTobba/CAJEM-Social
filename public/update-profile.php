<?php    
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    session_start();

    include 'config.php';

    $data = json_decode(file_get_contents("php://input"));
    $response = array();

    if (isset($data->user_id)) {

        // $user_id = $data->user_id;

        // $username = $data->username ?? '';
        // $old_password = $data->old_password ?? '';
        // $new_password = $data->new_password ?? '';
        // $profile_picture = $data->profile_picture ?? '';

        $query = "SELECT first_name, last_name, username, password FROM users WHERE id = '$user_id'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);

        if ($row) {

            $first_name = $row['first_name'];
            $last_name = $row['last_name'];
            $username = $row['username'];
            $password = $row['password'];
    
            if (password_verify($data->old_password, $password)) {

                $query = "UPDATE users SET ";
                if ($data->new_username) $query .= "username = '{$data->new_username}', ";
                if ($data->new_password) $query .= "password = '" . password_hash($data->new_password, PASSWORD_DEFAULT) . "', ";
                if ($data->profile_picture) $query .= "profile_picture = '{$data->profile_picture}', ";
                $query = rtrim($query, ", ");
                $query .= " WHERE id = '$user_id'";
        
                if (mysqli_query($conn, $query)) {
                    $response['success'] = true;
                    $response['message'] = 'Profile updated successfully.';
                    $response['first_name'] = $first_name;
                    $response['last_name'] = $last_name;
                    $response['username'] = $username;
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Error updating profile.';
                }

            } else {
                $response['success'] = false;
                $response['message'] = 'Incorrect old password.';
            }

        } else {
            $response['success'] = false;
            $response['message'] = 'User not found.';
        }

    } else {
        $response['success'] = false;
        $response['message'] = 'Invalid input.';
    }
    
    echo json_encode($response);
