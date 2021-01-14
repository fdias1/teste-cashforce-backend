const { Router } = require('express')
const routes = Router()
const jwtCheck = require('../utils/jwtCheck')

// Controllers disponíveis
const orders = require('../controllers/ordersController')
const auth = require('../controllers/authController')

// configuração das rotas
routes.use('/auth',auth)
routes.use('/orders',jwtCheck,orders)

module.exports = routes