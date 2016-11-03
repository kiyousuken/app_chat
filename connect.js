var socket = io();

$(function() {
    <!-- 送信されたときの処理  -->
    $('form').submit(function() {
        <!-- メッセージを取得 -->
        var mensaje = $('#msj').val();

        <!-- メッセージがなければ終了 -->
        if (mensaje === '') return false;

        <!-- メッセージを送信 -->
        socket.emit('message', mensaje);

        <!-- メッセージの中身を空にしえフォーカスする -->
        $('#msj').val('').focus();
        return false;
    });

    <!-- チャンネルを変えた時の処理 -->
    $('#channel').on('change', function() {
        <!-- チャンネル変更する -->
        socket.emit('change channel', $('#channel').val());
    });
});

<!--ここで作ったイベント名でサーバーサイドの処理を紐付ける-->
socket.on('welcome', function() {
    <!-- 取得したメッセージをulに追加 -->
    $('#message').append($('<li>').text('ようこそ！！'));
});

socket.on('user cnt', function(cnt) {
    <!-- 取得したメッセージをulに追加 -->
    $('#user_cnt p').html('').text("(A :" + cnt.a +"人) (B :" + cnt.b + "人)");
});

socket.on('message', function(msj, id) {
    <!-- 取得したメッセージをulに追加 -->
    $('#message').append($('<li>').text(id + " : " + msj));
});

socket.on('change channel', function(channel) {
    <!-- チャンネルが変わったことをメッセージで表示 -->
    $('#message').html('').append($('<li>').text('「チャンネル' + channel + '」に変更されました!'));
});

socket.on('get id', function(id) {
    <!-- チャンネルが変わったことをメッセージで表示 -->
    $('#user_name p').html('').text(id);
});