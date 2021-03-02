var express = require('express')
var bodyParser = require('body-parser');
const session = require('express-session');
const events = require('events');

const app = express()
const port = 25565

const myEmitter = new events.EventEmitter();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({ secret: 'ssshhhhh' }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/html/home.html')

})

app.post('/sendMessage', (req, res) => {

    var message = {username: req.body.username, currentMessage: req.body.currentMessage}

    myEmitter.emit('newMessage', message)
    res.sendStatus(200)

    res.end()

})

app.get('/getMessage', (req, res) => {

    myEmitter.on('newMessage', (bodyRes) => {

        res.json({username: bodyRes.username, currentMessage: bodyRes.currentMessage})

    })

})



app.listen(port, () => {
    console.log("App Started!")
})