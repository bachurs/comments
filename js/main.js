function addComment() {
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;
    
    var valid = validateComment('', email, name, message);

    var return_data = "";
    var hr = new XMLHttpRequest();
    var url = "controls/commentControl.php";
    var vars = "add=true&email="+email+"&name="+name+"&message="+message;
    console.log(valid);
    if (valid == 1) {
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {
                    return_data = hr.responseText;                                      
                    if (return_data != 0) {    
                        var comment = JSON.parse(return_data);
                        displayComment(comment.id, comment.email, comment.name, comment.message, comment.creation_date);
                        clearCommentForm();
                        updateCommentCount()
                        document.getElementById("comment-success-message").innerHTML = "Your comment was successfully added";
                        setTimeout(function(){
                            document.getElementById("comment-success-message").innerHTML = "";
                        }, 2000);
                    } else {
                        document.getElementById("comment-error-message").innerHTML = "There was an error while adding your comment. Please try again later. Sorry for your inconvenience";
                    }
            }
    }
    hr.send(vars);
    } else
        return;
}

//Initiate and execute comment validation
function validateComment(id, email, name, comment) {
    var valid = 1;
    var error = document.getElementById("comment-error-message"+id);
    error.innerHTML = "";
    
    if (email == "") {
        error.innerHTML = "Please enter your email adress<br />";
        valid = 0;
    } else if (!validateEmail(email, error)) {       
        valid = 0;       
    }
    
    //Remove multiple white spaces in string and trim white spaces from start and end
    name = name.replace(/\s{2,}/g,' ');
    name = name.trim();
    if (name == "") {
        error.innerHTML += "Please enter your name<br />";
        valid = 0;
    } else if (!validateName(name, error)) {
        valid = 0; 
    }
    
    if (comment == "") {
        error.innerHTML += "Please enter your comment";
        valid = 0;
    }
    return valid;
}

//Validate email after checking if email is not empty
function validateEmail(email, error) 
{
    var valid = 1;
    if (email.includes("@") && email.includes(".")) {
        // '@' can't be the first symbol
        var eta = email.indexOf("@", 1);
        var lastEta = email.lastIndexOf("@");
        var dot = email.lastIndexOf(".");
        //There can be only one '@' and it has to be atleast 1 char before the '.', after the '.' the must be atleast 2 chars
        if (eta != lastEta || (dot - 1 <= eta) || (dot >= email.length -2)) {
            error.innerHTML += "Please enter a valid email address. E.g. youremail@gmail.com<br />";
            valid = 0;
        }
    } else {
        error.innerHTML += "Please enter a valid email address. E.g. youremail@gmail.com<br />";
            valid = 0;
    }
    if (email.length > 254) {
        error.innerHTML += "The email address is too long. Maximum 254 characters allowed.<br />";
        valid = 0;
    }
    return valid;
}

//Validate name after checking if name is not empty
function validateName(name, error) 
{
    var valid = 1;
    var regex = /^[A-Za-z0-9ĄąČčĘęĖėĮįŠšŲųŪū_ ]+$/;
    if (!regex.test(name)) {
        error.innerHTML += "Please enter a valid name using a-z letters, lithuanian characters or _ and whitespace<br />";
        valid = 0;
    } else if (name.length > 60) {
        error.innerHTML += "The name you entered is too long. Maximum 60 characters allowed.<br />";
        valid = 0;
    }
    
    return valid;
}

//Displays a newly added comment
function displayComment(id, email, name, message, creation_date) {
    var comment_container = document.getElementById('comment-container');
    var card = document.createElement("div");
    card.className = "card";
    
    var card_header = document.createElement("div");
    card_header.className = "card-header";
    var comment_author = document.createElement("span");
    comment_author.className = "comment-author";
    comment_author.innerHTML = name;
    var comment_date = document.createElement("span");
    comment_date.className = "comment-date";
    comment_date.innerHTML = creation_date;
    var comment_reply_button = document.createElement("span");
    comment_reply_button.className = "comment-reply-button float-right";
    comment_reply_button.innerHTML = "Reply";
    comment_reply_button.setAttribute("onclick", "toggleReplyForm("+id+")");
    
    card_header.appendChild(comment_author);
    card_header.appendChild(comment_date);
    card_header.appendChild(comment_reply_button);
    
    var card_body = document.createElement("div");
    card_body.className = "card-body";
    card_body.innerHTML = message;
    
    card.appendChild(card_header);
    card.appendChild(card_body);
    
    var reply_form_div = document.createElement("div");
    reply_form_div.className = "reply-form";
    reply_form_div.id = "reply-form"+id;
    
    var reply_row = document.createElement("div");
    reply_row.className = "row";
    var reply_container = document.createElement("div");
    reply_container.className = "offset-1 col-11";
    reply_container.id = "replies_to"+id;
    
    reply_row.appendChild(reply_container);
    
    comment_container.insertBefore(reply_row, comment_container.firstChild);
    comment_container.insertBefore(reply_form_div, comment_container.firstChild);
    comment_container.insertBefore(card, comment_container.firstChild);
}

function clearCommentForm() {
    document.getElementById('email').value = "";
    document.getElementById('name').value = "";
    document.getElementById('message').value = "";
}

//Toggles the visibility of a reply form
function toggleReplyForm(id) {
    if (typeof id == "number" && (id % 1 === 0)) {
        var id = parseInt(id);
        var form_div = document.getElementById('reply-form'+id);
        if (form_div.innerHTML == "") {
            closeOtherReplyForms();
            form_div.innerHTML = `<div class='comment-form row reply-form' id='reply-to`+id+`'>
                    <div class="offset-md-3 col-md-7 reply-form-container">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="email">Email*</label>
                                    <input type="email" class="form-control" name="email`+id+`" id="email`+id+`" placeholder="mail@mail.com" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="name">Name*</label>
                                    <input class="form-control" type="text" name="name`+id+`" id="name`+id+`" placeholder="Tom Hanks"/>
                                </div>
                            </div>                   
                            <div class="form-group">
                                <label for="message">Comment*</label>
                                <textarea class="form-control" type="text" name="message`+id+`" id="message`+id+`" placeholder="Your comment"></textarea>
                            </div>
                            <div class="comment-error-message" id="comment-error-message`+id+`"></div>
                            <button class="btn btn-success form-control" type="button" onclick="replyToComment(`+id+`)">Submit</button>
                        </form>
                    </div>
                </div>`;
        } else {
            form_div.innerHTML = "";
        }
    }
}

//Closes other open reply forms. Used when opening a reply form.
function closeOtherReplyForms() {
    var reply_forms = document.getElementsByClassName('reply-form');
    var i;
    for (i = 0; i <reply_forms.length; i++) {
        reply_forms[i].innerHTML = "";
    }
}

function replyToComment(id) {
    if (typeof id == "number" && (id % 1 === 0)) {
        var id = parseInt(id);
        var email = document.getElementById('email'+id).value;
        var name = document.getElementById('name'+id).value;
        var message = document.getElementById('message'+id).value;

        var valid = validateComment(id, email, name, message);

        var return_data = "";
        var hr = new XMLHttpRequest();
        var url = "controls/commentControl.php";
        var vars = "reply=true&email="+email+"&name="+name+"&message="+message+"&id="+id;
        if (valid == 1) {
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function() {
                if(hr.readyState == 4 && hr.status == 200) {
                        return_data = hr.responseText; 
                        if (return_data != 0) {    
                            var reply = JSON.parse(return_data);
                            displayReply(reply.id, reply.email, reply.name, reply.message, reply.creation_date, reply.reply_to);
                            updateCommentCount();
                        } else {
                            document.getElementById("comment-error-message"+id).innerHTML = "There was an error while adding your comment. Please try again later. Sorry for your inconvenience";
                        }
                }
        }
        hr.send(vars);
        } else
            return;
    } else {
        document.getElementById("comment-error-message"+id).innerHTML = "There was an error while adding your comment. Sorry for your inconvenience";
    }
}

//Displays a new reply to another comment
function displayReply(id, email, name, message, creation_date, reply_to) {
    var reply_container = document.getElementById('replies_to'+reply_to);
    var card = document.createElement("div");
    card.className = "card";
    
    var card_header = document.createElement("div");
    card_header.className = "card-header";
    var comment_author = document.createElement("span");
    comment_author.className = "comment-author";
    comment_author.innerHTML = name;
    var comment_date = document.createElement("span");
    comment_date.className = "comment-date";
    comment_date.innerHTML = creation_date;
    
    card_header.appendChild(comment_author);
    card_header.appendChild(comment_date);
    
    var card_body = document.createElement("div");
    card_body.className = "card-body";
    card_body.innerHTML = message;
    
    card.appendChild(card_header);
    card.appendChild(card_body);
    
    reply_container.insertBefore(card, reply_container.firstChild);
    reply_to = parseInt(reply_to);
    toggleReplyForm(reply_to);
}

//Updates the comment count displayed in comment header. Used after adding a comment or a reply to a comment
function updateCommentCount() {
    var return_data = "";
    var hr = new XMLHttpRequest();
    var url = "controls/commentControl.php";
    var vars = "comment_count=true";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {
                    return_data = hr.responseText; 
                    if (return_data != 0) {    
                        var comment_count_message = return_data + " Comments";
                        document.getElementById("comment-header").innerHTML = comment_count_message;                        
                    }
            }
    }
    hr.send(vars);
}