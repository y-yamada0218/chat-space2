$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="wrapper__main-chat__message-list__post">
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
      `<div class="wrapper__main-chat__message-list__post">
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
        </div>
      </div>`
      return html;
    };
  }

  $('.wrapper__main-chat__message-form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.wrapper__main-chat__message-list').append(html);
      $('.wrapper__main-chat__message-list').animate({ scrollTop: $('.wrapper__main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.wrapper__main-chat__message-form__post-box__send').prop('disabled', false);
      return false
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.wrapper__main-chat__message-form__post-box__send').prop('disabled', false);
  });
  });
});