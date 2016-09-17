const address = '104.198.12.154';
const socket = new WebSocket('ws://' + address + '/chatroom/user');

const message = {
    name: 'user',
    msg: 'connected'
};

socket.onopen = function(event) {
  console.log('connected');
  socket.send(JSON.stringify('message'));
}

socket.onmessage = function(event) {
  console.log(event.data)
}
