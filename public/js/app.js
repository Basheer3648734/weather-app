


const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#msg-1');
const messagetwo = document.querySelector('#msg-2');
const button = document.querySelector('button');
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageone.textContent = "loading..."
    messagetwo.textContent = ''
    fetch("/weather?address=" + location).then(res => {


        button.addEventListener('click', () => {
            messageone.className = '';
            messagetwo.className = '';
        })




        res.json().then((data) => {
            if (data.error) {
                messageone.textContent = ''
                messagetwo.textContent = data.error;
                messagetwo.className = 'error';
            }
            else {

                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
                messagetwo.className = 'success';
            }
        })
    })

});