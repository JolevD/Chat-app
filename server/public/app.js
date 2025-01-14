const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const input = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()

    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
    input.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// displaying messages 

socket.on('message', (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

input.addEventListener('keypress', () => {
    socket.emit("activity", socket.id.substring(0, 5))
})

let activityTimer
socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`

    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 300)

})