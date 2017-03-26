/**
 * Created by Janith on 3/19/2017.
 */
var userId;

function start() {

    $.ajax({
        type: 'GET',
        url: 'http://34.192.103.7:8080/t-talk/ws/onlineUsers',
        async: false,
        dataType: 'json',
        success: function (result) {
            var buffer = "";

            for (var i in result) {
                var item = result[i];
                buffer += "<li><img src='images/user.jpg'>" +
                    "<span class='name'>" + item.displayName + "</span><i class='mdi mdi-menu-down'></i> </li>";

            }
            $('.onlineList').html(buffer);
        }
    });

    setInterval("pollChatMessages()", 2000);

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

                        $('ul.chat > li > .current').append(msgObject.message);

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
        userId = 3;
        }
    }
    return userId;
}