const { Router } = require('express')
const routes = Router()

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger_output.json')
routes.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// versões da API
const v1 = require('./v1')

// configuração das rotas de cada versão
routes.use('/v1',v1)

module.exports = routes