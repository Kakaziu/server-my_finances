const { Router } = require('express')
const routes = Router()
const tokenController = require('../controllers/tokenController')

routes.post('/', tokenController.login)
routes.post('/validate', tokenController.validateToken)

module.exports = routes