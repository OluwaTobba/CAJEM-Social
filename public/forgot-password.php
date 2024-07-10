<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    include 'config.php';

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data->email)) {
        $email = $data->email;
        
        // Check if the email exists in the database
        $query = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $query);

        if(mysqli_num_rows($result) > 0) {
            // Generate a unique reset token
            $token = bin2hex(random_bytes(50));

            // Store the token in the database with an expiry date (e.g., 1 hour)
            $expiry = date("Y-m-d H:i:s", strtotime('+1 hour'));
            $updateQuery = "UPDATE users SET reset_token = '$token', token_expiry = '$expiry' WHERE email = '$email'";
            mysqli_query($conn, $updateQuery);

            // Send the reset link to the user's email
            $resetLink = "http://localhost/social-media-app/public/reset-password.php?token=$token";
            $mail = new PHPMailer(true);
            
            try {
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'michaeloluwatoba14@gmail.com';
                $mail->Password   = 'ujuc vkrq ckae bwyk';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;
    
                //Recipients
                $mail->setFrom('no-reply@cajemsocial.com', 'CAJEM Social');
                $mail->addAddress($email);
    
                //Content
                $mail->isHTML(true);
                $mail->Subject = 'Password Reset Request';
                $mail->Body    = "Please click the following link to reset your password: <a href='$resetLink'>$resetLink</a>";
    
                $mail->send();
                echo json_encode(['success' => true, 'message' => 'Password reset link has been sent to your email.']);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => 'Failed to send reset link. Please try again. Mailer Error: ' . $mail->ErrorInfo]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Email not found.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Please provide an email address.']);
    }