var socket = io("https://chatwithm.herokuapp.com");
socket.on("register-fail", function (){
    alert("This username has already used.");
});
socket.on("register-success", function (data){
    alert("You has registered successfully");
    $("#currentUser").html(data);
    $("#login-form").hide(2000);
    $("#chat-form").show(1000);
});
socket.on("send-arr-user", function (data){
    $("#box-content").html("");
    data.forEach(function(i){
        $("#box-content").append("<div class='userOnline'>"+i +"</div>")
    });
});
socket.on("logout-success", function (){
    alert("You have successfully logout.");
    $("#chat-form").hide(2);
    $("#login-form").show(1);
    $("#textMessage").val("");
    $("#listMessages").val("");
});
socket.on("server-send-message", function(data){
    $("#listMessages").append(data.name+"    :    "+ data.mess+"\r\n");
});
$(document).ready(function (){
    $("#login-form").show();
    $("#chat-form").hide();
    $("#btnregister").click(function(){
        socket.emit("client-send-username",$("#username").val());
    });
    $("#btn-logout").click(function(){
        socket.emit("user-logout");
    });
    $("#btnSend").click(function(){
        socket.emit("user-send-message",$("#textMessage").val());
    });
    $(document).ready(function(){
    var $textarea = $("#listMessages");
    $textarea.scrollTop($textarea[0].scrollHeight);
});

});
