
$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('#login').click(function(){
    var SendInfo= {
        email: $("#email").val(),
        password:$("#password").val()
    };

    if(SendInfo.email == 'smsl.cs@gmail.com'){
        setUser(1)
    } else if(SendInfo.email == 'ashokae@gmail.com'){
        setUser(2)
    } else if(SendInfo.email == 'kalpanie@gmail.com'){
        setUser(3);
    } else {
        setUser(3);
    }
/*
    $.ajax({
        type : 'POST',
        url : 'http://34.192.103.7:8080/t-talk/ws/users/login',
        headers: {
            'Access-Control-Allow-Origin' : '*'
        },
        contentType: "application/json",
        data: JSON.stringify(SendInfo),
        success : function(user){
            if(user) {
                localStorage.setItem('User', user); //set
                localStorage.setItem('username', user.displayName); //set
                window.location.href = "chat.html";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if(SendInfo.email == 'kalpanie@gmail.com'){
                setUser(3)
            } if(SendInfo.email == 'smsl.cs@gmail.com'){
                setUser(1)
            }
        }

    });*/
});

function setUser(id) {
    $.ajax({
        type: 'GET',
        url: 'http://34.192.103.7:8080/t-talk/ws/user/'+id,
        async: false,
        dataType: 'json',
        success: function (user) {
            if(user){
                localStorage.setItem('UserId', user.userId); //set
                localStorage.setItem('User', user); //set
                localStorage.setItem('username', user.displayName); //set
                window.location.href = "chat.html";
            }
        }
    });
}

$( document ).ready(function() {
   var user =  localStorage.getItem('User');
   if(user){
       window.location.href = "chat.html";
   }
});