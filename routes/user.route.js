var express = require('express')
const userController = require('../controllers/user.controller')
var router = express.Router()

router.get('/', userController.index)
router.get('/create', userController.create)
router.get('/:id', userController.view)
router.get('/del/:id', userController.del)
router.post('/create', userController.postCreate)
router.get('/search', userController.search)


module.exports = router