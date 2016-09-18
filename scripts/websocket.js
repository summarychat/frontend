var username;
var usernameCheck = setInterval(function() {
  if (getUsername()) {
    clearInterval(usernameCheck);
    username = getUsername();
  }
}, 500);


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
  let user = data.user;
  // if current user doesn't exist then one is created
    if (typeof currentUser === 'undefined') {
      currentUser = user;
      console.log('current user:', currentUser);
      if (username !== user) {
        appendMessage(data.msg, true, currentUser);
      }
    } else if (currentUser === user) {
      console.log('same person is talking, dont change name');
      if (username !== user) {
        appendMessage(data.msg, false, user);
      }
    } else {
      currentUser = user;
      console.log('diff person is talking, change the name');
      if (username !== user) {
        appendMessage(data.msg, true, user)
      }
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
