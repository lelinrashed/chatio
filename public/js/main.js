$(document).ready(function () {
    let messages = [];
    let socket = io.connect('http://localhost:3000');
    let chatForm = $('#chatForm');
    let message = $('#chatInput');
    let chatWindow = $('#chatWindow');
    let userForm = $('#userForm');
    let userName = $('#username');
    let users = $('#users');
    let error = $('#error');

//    Submit user form
    userForm.on('submit', function (e) {
        socket.emit('set user', username.val(), function (data) {
           if (data) {
               $('#userFormWrap').hide();
               $('#mainWrap').show();
           }else {
               error.html('Username is taken.');
           }
        });
        e.preventDefault();
    });

//    Display usernmaes
    socket.on('users', function (data) {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">'+data[i]+'</li>';
        }
        users.html(html);
    });
});