<?php

class Comment {
    private $id;
    private $email;
    private $name;
    private $message;
    private $creation_date;
    private $reply_to;
    private $db;
    
    function Comment($email, $name, $message, $reply_to) {
        $this->email = $email;
        $this->name = $name;
        $this->message = $message;
        $this->reply_to = $reply_to;
        $this->creation_date = date('Y-m-d');
        $this->db = mysqli_connect("localhost","root", "", "task");
        mysqli_set_charset($this->db, "utf8");
    }
    
    function addComment() {
        $q = "INSERT INTO comments VALUES(0, '$this->email', '$this->name', '$this->message', '$this->creation_date', null)";
        if (mysqli_query($this->db, $q)) {
            return mysqli_insert_id($this->db);
        } else {
            return 0;
        }
    }
    
    function getComments() {
        $q = "SELECT * FROM comments WHERE reply_to IS null ORDER BY creation_date, id DESC";
        return mysqli_query($this->db, $q);
    }
    
    function getCommentById($id) {
        $q = "SELECT * FROM comments WHERE id = '$id'";
        return mysqli_query($this->db, $q);
    }
    
    function addReply() {
        $q = "INSERT INTO comments VALUES(0, '$this->email', '$this->name', '$this->message', '$this->creation_date', '$this->reply_to')";
        if (mysqli_query($this->db, $q)) {
            return mysqli_insert_id($this->db);
        } else {
            return 0;
        }
    }
    
    function getRepliesToComment($comment_id) {
        $q = "SELECT * FROM comments WHERE reply_to = '$comment_id' ORDER BY creation_date, id DESC";
        return mysqli_query($this->db, $q);
    }
    
    function getCommentCount() {
        $q = 'SELECT COUNT(id) as total FROM comments';
        return mysqli_query($this->db, $q);
    }
}
