var express = require('express')
const bodyParser = require('body-parser')

var userRoute = require('./routes/user.route')

var app = express();
var port = 3000
app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1> <a href="/users">users</a>')
})

app.use('/users', userRoute)

app.listen(port, () => console.log(`Server listning on port ${port}`))
