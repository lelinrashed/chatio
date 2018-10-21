const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

let users = [];

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static path
app.use(express.static(path.join(__dirname, 'public')));

// Socket io connect
io.sockets.on('connection', (socket) => {
    //  Set username
    socket.on('set user', (data, callback)=>{
        if (users.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateUsers();
        }
    });
    function updateUsers() {
        io.socket.emit('users', users);
    }
});

// Route
app.get('/', (req, res, next) => {
    res.render('index');
    // res.send('index');
});

server.listen(port, ()=>{
    console.log('Server started on '+port);
});