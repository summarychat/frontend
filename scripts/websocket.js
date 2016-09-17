const address = '104.198.12.154';
const socket = new WebSocket('ws://' + address + '/chatroom/user');

const message = {
    name: 'sumchat',
    msg: 'connected'
};

socket.onopen = function(event) {
  socket.send(JSON.stringify(message));
}


socket.onmessage = function(event) {
  let data = JSON.parse(event.data);
  if (typeof currentUser === 'undefined') {
    console.log('setting currentUser...');
    let currentUser = data.name
  }

  if (currentUser === data.name) {
    console.log('current user is still messaging, (dont update name)');
  } else {
    console.log('execute appendMessage fnc with special attribute that allows the injection of new name');
  }
  appendMessage(data.msg, 'server');
}

function appendMessage(message, type) {
  const messageItem = document.createElement('div');
  const li = document.createElement('li');
  li.innerText = message;
  messageItem.appendChild(li);
  messageItem.className = type;
  $('.chat__messages__list').append(messageItem);
}
