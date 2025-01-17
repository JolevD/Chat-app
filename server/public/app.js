const socket = io('ws://localhost:3500')


const messageInput = document.querySelector('#message')
const nameInput = document.querySelector('#name')
const roomInput = document.querySelector('#room')
const activity = document.querySelector('.activity')
const chatDisplay = document.querySelector('.chat-display')
const roomList = document.querySelector('.room-list')
const userList = document.querySelector('.user-list')

function sendMessage(e) {
    e.preventDefault()

    if (nameInput.value && roomInput.value && messageInput.value) {
        socket.emit('message', {
            "text": messageInput.value,
            "name": nameInput.value
        }
        )
        input.value = ''
    }
    input.focus()
}

function enterRoom(e) {
    e.preventDefault()
    if (roomInput.value && nameInput.value) {
        socket.emit("enterRoom", {
            "name": nameInput.value,
            "room": roomInput.value
        })
    }
}


document.querySelector('.form-msg')
    .addEventListener('submit', sendMessage)

document.querySelector('.form-join')
    .addEventListener('submit', enterRoom)

messageInput.addEventListener('keypress', () => {
    socket.emit("activity", nameInput.value)
})


// displaying messages 

socket.on('message', (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})


let activityTimer
socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`

    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 300)

})