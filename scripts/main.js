$(document).ready(function() {
  $('.landing__button').click(function() {
    event.preventDefault();
    $('#landing').hide('easeInOutCubic');
    $('#chat').show();
    $('body').css('overflow', 'hidden');
    $('.chat__input-field__input').focus();
  });

  $('.chat__input-field__input').keyup(function(event) {
    let message = $(this).val();
    messageSubmit(event, message);
  });

  function messageSubmit(event, message) {
    // if browser supports event.keyCode, use so. if not, use event.which.
      const keyCode = (event.keyCode ? event.keyCode : event.which);
    // if the enter key was pressed, append message to chat, and clear input field.
      if (keyCode === 13) {
        console.log(message);
        if (message !== '') {
          appendMessage(message);

          let messageJSON = {
            name: 'username',
            msg: message
          }
          socket.send(JSON.stringify(messageJSON));
        }

        // clearing value of input
          $('.chat__input-field__input').val('');
      }
  }

  function appendMessage(message) {
    let messageItem = document.createElement('li');
    messageItem.innerText = message;
    $('.chat__messages__list').append(messageItem);
  }

  $('.chat__summary-toggle').click(function() {
    $('.chat__summary').toggle();
    $('#chat').toggleClass('chat--expanded-view');
  });

});
