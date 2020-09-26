var express = require('express')
const bodyParser = require('body-parser')

//Small JSON database for Node, Electron and the browser. Powered by Lodash
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

var app = express();
var port = 3000

// var users = [
//     {id: 1, name: 'Huy'},
//     {id: 2, name: 'Toc'},
//     {id: 3, name: 'Thuy'},
//     {id: 4, name: 'Hanh'},
//     {id: 5, name: 'Son'},
//     {id: 6, name: 'Suong'},
// ] 

app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1> <a href="/users">users</a>')
// })

app.get('/', function (req, res) {
    res.render('index', { 
        title: 'Hey', 
        message: 'Hello there!' 
    })
})
app.get('/users', (req, res) => {
    res.render('users/index', {
       users: db.get('users').value()
    })
})


app.get('/users/create', function (req, res) {
    
    res.render('users/create', {
        
    })
})

app.get('/users/:id', function (req, res) {
    var id = req.params.id

    var user = db.get('users')
    .find({ id: parseInt(id)})
    .value()

    res.render('users/view', {
        user: user
    })
})
app.post('/users/create', function (req, res) {
    // console.log(req.body);
    // users.push({name: req.body.name})

    // Add a post
    db.get('users')
    .push(req.body)
    .write()

    res.redirect('/users')
})

app.get('/users/search', function (req, res) {
    
    var q = req.query.q
    // var matchedUsers = users.filter((user) => {
    //     return user.name.indexOf(q) !== -1
    // })

    // For performance, use .value() instead of .write() if you're only reading from db
    var users = db.get('users')
    .find({ name: 'uy'})
    .value()

    // console.log(users);

    res.render('users/index', {
        users: users,
        q: q
    })
})


app.listen(port, () => console.log(`Server listning on port ${port}`))
