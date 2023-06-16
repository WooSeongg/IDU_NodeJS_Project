const messageList = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const form = document.getElementById('input-form');

//채팅사용자 이름
let username = ''; 
// Socket.IO 인스턴스
let socket;

// li 요소를 생성하여 페이지에 삽입함
function addMessage(message) {
    const li = document.createElement('li');
    li.innerHTML = message;
    messageList.appendChild(li);
}

// 메시지 전송
function sendMessage(message) {
    const data = {
        username: username,
        message: message
    };
    socket.emit('chat message', data);
}

//폼에서 submit이벤트가 발생했을 때
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    //공백이 아닌경우에만 전송함
    if (message.trim() !== '') {
        sendMessage(message);
        messageInput.value = '';
    }
});

// Socket.IO 인스턴스 생성
socket = io();

socket.on('chat message', (data) => {
    const { username, message, color } = data;
    const coloredUsername = `<span style="color: ${color}">${username}</span>`;
    const formattedMessage = `${coloredUsername}: ${message}`;
    addMessage(formattedMessage);
});

// 서버에서 받은 사용자 이름 저장
socket.on('set username', (data) => {
    username = data.username;
});

socket.on('connect', () => {
    // 사용자이름을 입력받음
    const newUsername = prompt('이용자 이름을 입력하세요');
    socket.emit('set username', newUsername);
});