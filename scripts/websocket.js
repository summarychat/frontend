var username;
var group;

var usernameCheck = setInterval(function() {
  if (getUsername()) {
    clearInterval(usernameCheck);
    username = getUsername();
  }
}, 500);

var groupCheck = setInterval(function() {
  if (getGroupID()) {
    clearInterval(groupCheck);
    group = getGroupID();
    console.log(group);
  }
}, 500);


const address = '104.198.12.154';
const socket = new WebSocket('ws://' + address + '/' + group + '/' + username);

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
      // currentUser is the user that websockets is sending
        currentUser = user;
      console.log('current user:', currentUser);
      if (username !== currentUser) {
        appendMessage(data.msg, true, currentUser);
      }
    } else if (currentUser === user) {
      console.log('same person is talking, dont change name');
      if (username !== currentUser) {
        appendMessage(data.msg, false);
      }
    } else {
      currentUser = user;
      console.log('diff person is talking, change the name');
      if (username !== currentUser) {
        appendMessage(data.msg, true, currentUser)
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
  console.log(message);
  messageItem.appendChild(li);
  messageItem.className = 'server';
  $('.chat__messages__list').append(messageItem);
}
