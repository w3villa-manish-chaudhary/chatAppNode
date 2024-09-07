const express = require('express');
const http = require("http")
const { Server } = require("socket.io");



const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());



const PORT = 8000;

app.use(express.static("./public"))




app.get('/', (req, res) => {
    res.sendFile("./public/index.html")

});


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        
    });
});






server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
