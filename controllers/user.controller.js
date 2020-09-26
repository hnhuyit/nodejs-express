var shortid = require('shortid')
var db = require('../db')

module.exports = {

    index: (req, res) => {
        res.render('users/index', {
           users: db.get('users').value()
        })
    },
    create: (req, res) => { 
        res.render('users/create', {})
    },
    view: function (req, res) {
        var id = req.params.id
    
        var user = db.get('users')
        .find({ id: (id)})
        .value()
    
        res.render('users/view', {
            user: user
        })
    },
    del: function (req, res) {
        db.get('users')
        .remove({ id: req.params.id})
        .write()
        res.redirect('/users')
    },
    postCreate: function (req, res) {
        // console.log(req.body);
        req.body.id = shortid.generate()
        // Add a post
        db.get('users')
        .push(req.body)
        .write()
    
        res.redirect('/users')
    },
    search: function (req, res) {
    
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
    }


}