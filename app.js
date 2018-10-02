var express = require('express');
var app= express();
var indexRouter = require('./routers/index.js');

app.set('view engine','ejs');
app.set('views','./views/');
app.use(express.static('public'));
//app.use('/',indexRouter);
var server = require('http').Server(app);
var io= require('socket.io')(server);

var Users=[""];
io.on("connection", function (socket){
    //console.log("Co nguoi ket noi: "+socket.id);
    socket.on("disconnect", function (){
        console.log(socket.id +" ngat ket noi");
    });
    socket.on("client-send-username", function (data){
       if (Users.indexOf(data)>=0) {
           socket.emit("register-fail");
       } else{
           Users.push(data);
           socket.username=data;
           socket.emit("register-success",data);
           io.sockets.emit("send-arr-user",Users);
       }
    });

    socket.on("user-logout", function (){
        socket.emit("logout-success");
        Users.splice(Users.indexOf(socket.username),1);
        socket.broadcast.emit("send-arr-user",Users);
    });
    socket.on("user-send-message", function (data){
        io.sockets.emit("server-send-message",{name: socket.username, mess:data});
    });

});
const port=process.env.PORT || 3000
server.listen(port);
app.get('/', function (req,res) {
    res.render("index");
    
})
