window.onload = () =>{
    const socket = io();

    const form = document.getElementById('form')
    const input = document.getElementById('input')

    form.addEventListener('submit' ,(event)=>{
       //stop the default event from happening which is page refresh
        event.preventDefault()
       //emit sends a piece of data to server
       //1st para is name of event we are sending itis customizable
       //except 'connect' and 'disconnect'
        //2nd param - data we are sending
       socket.emit('message ', input.value) 
        
       input.value = ''; //removes input text after submission
  
    })

    socket.on('server sent data', (dataFromServer)=>{
        const item = document.createElement('p')
        item.textContent = dataFromServer
        const messages = document.getElementById('all-messages')
        messages.appendChild(item);
   
    })

}