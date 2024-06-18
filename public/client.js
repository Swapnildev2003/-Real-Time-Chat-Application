const socket = io();
let message_area = document.querySelector(".message_area")
let textarea = document.getElementById("textarea");
let user;
do {

    user = prompt("Please enter your name: ")

} while (!user)
textarea.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        let msg = e.target.value;
        e.preventDefault();
        sendmessage(msg);
    }
})

function sendmessage(message) {
    let msg = {
        username: user,
        message: message.trim()
    }

    appendmessage(msg, "outgoing")
    socket.emit("connection", msg)
    textarea.value = ""
}

function appendmessage(msg, type) {
    let div = document.createElement('div')
    let className = type;
    div.classList.add(className, 'message');
    let markup = `
      <h4>${msg.username}</h4>
      <p>${msg.message}</p>`

    div.innerHTML = markup
    message_area.appendChild(div)


}

socket.on('connection', (msg) => {
    appendmessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    message_area.scrollTop = message_area.scrollHeight
}
