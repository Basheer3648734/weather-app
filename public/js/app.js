


const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#msg-1');
const messagetwo = document.querySelector('#msg-2');
// messageone.textContent = 'from javascript'
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageone.textContent = "loading..."
    messagetwo.textContent = ''
    fetch("/weather?address=" + location).then(res => {
        res.json().then((data) => {
            if (data.error) {
                messageone.textContent = ''
                messagetwo.textContent = data.error;

            }
            else {
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
            }
        })
    })

});