var express = require('express')
var bodyParser = require('body-parser');
const session = require('express-session');
const events = require('events');

const app = express()
const port = 25565

const http = require('http').Server(app);
const io = require('socket.io')(http);

const myEmitter = new events.EventEmitter();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({ secret: 'ssshhhhh' }));

var responsesAwaitingMessage = []

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/html/home.html')

})

app.post('/sendMessage', (req, res) => {

    var message = { username: req.body.username, currentMessage: req.body.currentMessage }

    myEmitter.emit('newMessage', message)

    res.sendStatus(200)

})

myEmitter.on('newMessage', (currentMessage) => {

    if (currentMessage.username != '' && currentMessage.currentMessage != '') {
        io.emit('newMessageForYou', currentMessage)
    }
})


http.listen(port, () => {
    console.log("App Started!")
})