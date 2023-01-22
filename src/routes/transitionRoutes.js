const { Router } = require('express')
const routes = Router()
const transitionController = require('../controllers/transitionController')
const loginRequired = require('../middlewares/loginRequired')

routes.get('/', loginRequired, transitionController.index)
routes.post('/', loginRequired, transitionController.store)
routes.delete('/:id', loginRequired, transitionController.delete)
routes.put('/:id', loginRequired, transitionController.edit)
routes.get('/:id', loginRequired, transitionController.show)


module.exports = routes