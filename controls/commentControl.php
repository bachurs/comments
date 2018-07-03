<?php
include("../db.php");
include("../classes/comment.php");
//Used for adding a comment
if(isset($_POST['add']) && $_POST['add'] == true) {
    $email = $_POST['email'];
    $name = $_POST['name'];
    $message = $_POST['message'];
    //sanitize input and and prevent sql injections
    $email = sanitize_input($email);
    $name = sanitize_input($name);
    $message = sanitize_input($message);
    
    $email = mysqli_real_escape_string($db, $email);
    $name = mysqli_real_escape_string($db, $name);
    $message = mysqli_real_escape_string($db, $message);

    $comment = new Comment($email, $name, $message, null);
    $id = $comment->addComment();
    if ($id != 0) {
        $new_comment = mysqli_fetch_assoc($comment->getCommentById($id));
        echo json_encode($new_comment);
    } else {
        echo json_encode($id);
    }
}

//Used for replying to a comment
if(isset($_POST['reply']) && $_POST['reply'] == true) {
    $email = $_POST['email'];
    $name = $_POST['name'];
    $message = $_POST['message'];
    $reply_to = $_POST['id'];
    //sanitize input and and prevent sql injections
    $email = sanitize_input($email);
    $name = sanitize_input($name);
    $message = sanitize_input($message);
    $reply_to = sanitize_input($reply_to);
    
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $name = mysqli_real_escape_string($db, $_POST['name']);
    $message = mysqli_real_escape_string($db, $_POST['message']);
    $reply_to = mysqli_real_escape_string($db, $_POST['id']);

    $comment = new Comment($email, $name, $message, $reply_to);
    $id = $comment->addReply();
    if ($id != 0) {
        $new_comment = mysqli_fetch_assoc($comment->getCommentById($id));
        echo json_encode($new_comment);
    } else {
        echo json_encode($id);
    }
}

//Used for updating the comment count
if(isset($_POST['comment_count']) && $_POST['comment_count'] == true) {
    $comment = new Comment(0, 0, 0, 0);
    $result = $comment->getCommentCount();
    if ($result != false) {
        $comment_count = mysqli_fetch_assoc($result);
        $comment_count = $comment_count['total'];
        echo $comment_count;
    } else {
        echo 0;
    }
}

//Function used for sanitizing input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

