/**
 * Created by Janith on 3/19/2017.
 */

var userId;
var currentUserId;
var messages = [];

function start() {

    setInterval("pollOnlineUsers()", 2000);
    setInterval("pollChatMessages()", 2000);

}

function pollOnlineUsers(){
    $.ajax({
        type: 'GET',
        url: 'http://34.192.103.7:8080/t-talk/ws/onlineUsers',
        async: false,
        dataType: 'json',
        success: function (result) {
            var buffer = "";

            for (var i in result) {
                var item = result[i];
                if (item.userId != getUserId()) {
                    buffer += "<li onclick='onlineClick(" + item.userId + ")'><img src='images/user.jpg'><div class='content-container'>" +
                        "<span class='name'>" + item.displayName + "</span><i class='mdi mdi-menu-down'></i> </div></li>";
                }
            }
            $('.onlineList').html(buffer);
        }
    });

}


function onlineClick(id) {
    currentUserId = id;
    var str = "";
    for (var i in messages) {
        var item = messages[i];
        if ((item.sender == currentUserId && item.receiver == userId) || (item.sender == userId && item.receiver == currentUserId)) {

            if (item.sender == currentUserId) {
                str += "<li><img src='images/user.jpg'><div class='message'>" + item.message + "</div></li>";
            }
            else {
                str += "<li><img src='http://s8.postimg.org/76bg2es2t/index.png'><div class='message'>" + item.message + "</div></li>";
            }
        }
    }
    $("#chatMainList").html(str);
    // timeout just for eyecandy...
    setTimeout(function () {
        $('.shown').removeClass('shown');

        $('.list-chat').addClass('shown');
        setRoute('.list-chat');
        $('.chat-input').focus();
    }, 300);

}

function pollChatMessages() {
    $.ajax({
        url: 'http://34.192.103.7:8080/t-talk/ws/chat/' + getUserId(),
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            jQuery.each(data, function (sender1, msgObject) {
                var state = msgObject.state;
                if (state == "chat") {
                    if (msgObject.message != "\n" && msgObject.message != "") {
                        messages.push(msgObject);
                        //alert("current user" + msgObject.window.currentUserId);
                        if (msgObject.sender == window.currentUserId) {
                            //alert(msgObject.message);

                            $("#chatMainList").append("<li><img src='images/user.jpg'>" +
                                "<div class='message'>" + msgObject.message + "</div></li>");
                        }
                        else{
                            //alert(msgObject.senderDisplayName+ " : " + msgObject.message );
                        }

                    }
                }
            });
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getUserId() {
    if (!userId) {
        var user = localStorage.getItem('User');
        if (user && user.userId) {
            userId = user.userId;
        }
        else {
            userId = localStorage.getItem('UserId');
        }
    }
    return userId;
}