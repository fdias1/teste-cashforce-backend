const { Router } = require('express')
const routes = Router()

// Controllers disponíveis
const orders = require('../controllers/ordersController')

// configuração das rotas
routes.use('/orders',orders)

module.exports = routes