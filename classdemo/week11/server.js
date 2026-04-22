const express = require('express')
const nunjucks = require('nunjucks')

//new
// imports new libraries
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express()

// initialize variables using new libraries
const httpServer = createServer(app);
//create new web socket server and link to express
const io = new Server(httpServer);

//regular middleware
app.use(express.static('public'))
app.set('view engine', 'njk')
nunjucks.configure('views', {
    autoescape:true,
    express:app
})

app.get('/', (req,res)=>{
    res.render('index.njk', {numClient : io.engine.clientsCount})
})

// checks if a client has been connected
//any websocket events will go into this connection handler
io.on('connection', (socket) => {
	console.log('a user connected');
//every time receive data called 'silly note' will execute function
    socket.on('silly note' , (dataFromClient)=>{
        console.log('message:' + dataFromClient);
        console.log('totalusers'+ io.engine.clientsCount)

        //send data back to client
        io.emit('server sent data', dataFromClient)
    })


    //example of handling a specific event fired from client
    socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
//replaces app.listen 
httpServer.listen(3000, ()=>{
    console.log('server started on port 3000')
})