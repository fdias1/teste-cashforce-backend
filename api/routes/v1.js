const { Router } = require('express')
const routes = Router()

// Controllers disponíveis
const orders = require('../controllers/ordersController')

routes.use('/orders',orders)

module.exports = routes