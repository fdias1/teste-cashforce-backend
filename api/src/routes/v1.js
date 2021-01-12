const { Router } = require('express')
const routes = Router()

// Controllers disponíveis
const orders = require('../controllers/ordersController')
const providers = require('../controllers/providersController')

routes.use('/orders',orders)
routes.use('/providers',providers)

module.exports = routes