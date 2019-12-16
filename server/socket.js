var io = require('socket.io').listen(9000);

io.on('connection', function (socket) {

    console.log('connected:', socket.client.id);

    socket.on('videoStream', function (data) {

        console.log('Video Stream output:', data);

    });

    setInterval(function(){
      socket.emit('blocklyMessage', Math.random());
    }, 3000);

});
