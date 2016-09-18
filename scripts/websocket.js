const address = '104.198.12.154';
const socket = new WebSocket('ws://' + address + '/chatroom/user');

const message = {
    name: 'sumchat',
    msg: 'connected'
};

socket.onopen = function(event) {
  console.log('connected');
}

let currentUser;
socket.onmessage = function(event) {
  let data = JSON.parse(event.data);
  if (typeof currentUser === 'undefined') {
    console.log('setting currentUser...');
    currentUser = data.user;
    console.log(currentUser);
  }

  if (currentUser === data.user) {
    console.log('same person is talking, dont change name');
    appendMessage(data.msg, false, data.user);
  } else {
    currentUser = data.user;
    console.log('diff person is talking, change the name');
    appendMessage(data.msg, true, data.user)
  }
}

function appendMessage(message, nameBool, name) {
  const messageItem = document.createElement('div');
  if (nameBool) {
    const nameParagraph = document.createElement('p');
    nameParagraph.innerText = name;
    messageItem.appendChild(nameParagraph);
  }
  
  const li = document.createElement('li');
  li.innerText = message;
  messageItem.appendChild(li);
  messageItem.className = 'server';
  $('.chat__messages__list').append(messageItem);
}
