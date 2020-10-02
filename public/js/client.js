let socket = io()

let input = document.getElementById('inputMsg')
let form = document.getElementById('inpForm')
let btn = document.getElementById('btnSend')
let container = document.getElementById('container')

input.focus()
let ting = new Audio('ting.mp3')

function append(message, pos) {
    let div = document.createElement('div')
    div.innerText = message
    div.classList.add(pos);
    div.classList.add('message');
    container.appendChild(div)
    if (pos == 'left')
        ting.play()
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value;
    append(`you:${message}`, 'right')
    socket.emit('send', message)
    input.value = ''
})

const name = prompt('name to join chat');
socket.emit('new-user-joined', name)

socket.on('user-joined', (name) => {
    append(`${name} join the chat`, 'right')
})
socket.on('rcv', (data) => {
    append(`${data.name}:${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left chat`, 'left')
})

