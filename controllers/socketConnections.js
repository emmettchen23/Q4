const socketIO = require('socket.io');

module.exports = function (server) {
  const io = socketIO(server);

  io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('message', function (data) {
      io.emit('message', data);
    });

    socket.on('disconnect', function () {
      console.log('A user disconnected: ' + socket.id);
    });
  });

  return io;
};
