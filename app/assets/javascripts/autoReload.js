$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="wrapper__main-chat__message-list__post" data-message-id=${message.id}>
          <div class="wrapper__main-chat__message-list__post__post-info">
          <div class="wrapper__main-chat__message-list__post__post-info__name">
              ${message.user_name}
            </div>
            <div class="wrapper__main-chat__message-list__post__post-info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__main-chat__message-list__post__message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="wrapper__main-chat__message-list__post" data-message-id=${message.id}>
        <div class="wrapper__main-chat__message-list__post__post-info">
        <div class="wrapper__main-chat__message-list__post__post-info__name">
            ${message.user_name}
          </div>
          <div class="wrapper__main-chat__message-list__post__post-info__time">
            ${message.created_at}
          </div>
        </div>
        <div class=".wrapper__main-chat__message-list__post__message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.wrapper__main-chat__message-list__post:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.wrapper__main-chat__message-list').append(insertHTML);
        $('.wrapper__main-chat__message-list').animate({ scrollTop: $('.wrapper__main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});