let address = '104.198.12.154';
let socket = new WebSocket('ws://' + address + '/chatroom/user');

let msg = {
    user: 'user',
    content: 'hello world'
};

socket.onopen = function(event) {
  console.log('connected');
  socket.send(JSON.stringify(msg));
}

socket.onmessage = function(event) {
  console.log(event.data)
}
