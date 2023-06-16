const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ColorHash = require('color-hash');

const colorHash = new ColorHash();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 클라이언트가 접속하면 실행
io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    // 모든 클라이언트에게 채팅 메시지 전송
    io.emit('chat message', {
      username: socket.username,
      message: data.message,
      color: socket.color
    });
  });

  socket.on('set username', (username) => {
    // 소켓 객체에 사용자명 저장
    socket.username = username;
    // 사용자에게 고유한 색상 부여
    socket.color = colorHash.hex(username);
    // 모든 클라이언트에게 사용자명 전송
    io.emit('set username', { username: username });
  });
});

http.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});