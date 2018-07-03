<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
         <!-- CSS -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/custom.css">
        
        <!-- JavaScript -->
        <script src="js/bootstrap.min.js"></script>       
        <script src="js/main.js"></script>
        <title>Komentarai</title>
    </head>
<?php
include("db.php");
include("classes/comment.php");
$comment = new Comment(0, 0, 0, 0);
//Retrieve all non reply comments from the database
$comments = $comment->getComments();
//Retrieve all comment count from the database
$comment_count = mysqli_fetch_assoc($comment->getCommentCount());
$comment_count = $comment_count['total'];
if ($comment_count > 0) {
    $comment_count_message = $comment_count . " Comments";
} else {
    $comment_count_message = "No one has commented yet.";
}
?>
    <body>
        <div class="container main-container">
            <div class="jumbotron">
                <h2>Užduotis: komentavimo forma</h2>
            </div>
            <hr />
            <div class="comment-form row">
                <div class="offset-md-2 col-md-8">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="email">Email*</label>
                                <input type="email" class="form-control" name="email" id="email" maxlength="255" placeholder="mail@mail.com" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="name">Name*</label>
                                <input class="form-control" type="text" name="name" id="name" maxlength="60" placeholder="Tom Hanks"/>
                            </div>
                        </div>                   
                        <div class="form-group">
                            <label for="message">Comment*</label>
                            <textarea class="form-control" type="text" name="message" id="message" maxlength="2048" placeholder="Your comment"></textarea>
                        </div>
                        <div class="comment-error-message" id="comment-error-message"></div>
                        <div class="comment-success-message" id="comment-success-message"></div>
                        <button class="btn btn-success form-control" type="button" onclick="addComment()">Submit</button>
                    </form>
                </div>
            </div>
            <hr />
            <div class="comment-header" id='comment-header'><?= htmlspecialchars($comment_count_message) ?></div>
            <div class="comment-container" id="comment-container">
<?php
    //Lists all the comments
    foreach($comments as $c) {
?>
                <div class="card" id="card<?= htmlspecialchars($c['id']) ?>">
                    <div class="card-header">
                        <span class="comment-author"><?= $c['name'] ?></span><span class="comment-date"><?= htmlspecialchars($c['creation_date']) ?></span>
                        <span class="comment-reply-button float-right" onclick="toggleReplyForm(<?= htmlspecialchars($c['id']) ?>)">Reply</span>
                    </div>
                    <div class="card-body">
                        <?= htmlspecialchars($c['message']) ?>
                    </div>
                </div>
                <div class="reply-form" id="reply-form<?= htmlspecialchars($c['id']) ?>"></div>
                <div class="row">
                    <div class="offset-1 col-11" id="replies_to<?= htmlspecialchars($c['id']) ?>">
<?php
        $replies = $comment->getRepliesToComment($c['id']);
        //Lists all replies to current comment
        foreach($replies as $r) {
?>
                        <div class="card" id="card<?= htmlspecialchars($r['id']) ?>">                       
                            <div class="card-header">
                                <span class="comment-author"><?= htmlspecialchars($r['name']) ?></span><span class="comment-date"><?= htmlspecialchars($r['creation_date']) ?></span>
                            </div>
                            <div class="card-body">
                                <?= htmlspecialchars($r['message']) ?>
                            </div>
                        </div>
<?php
        }
?>
                    </div>
                </div>
<?php
        
    }
?>               
            </div>
        </div>
        <footer class="footer">
            &copy; Gytis Bernotavičius 2018
        </footer>
    </body>
</html>
