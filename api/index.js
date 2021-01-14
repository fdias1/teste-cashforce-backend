if (process.env.NODE_ENV !== 'PRD') require('dotenv').config()
global.logger = require('simple-node-logger').createSimpleLogger('logs/api.log')
const port = process.env.PORT
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./src/routes/routes.js')

app.use(express.json())
app.use(cors({origin:true}))
app.use(routes)

app.listen(port,() => logger.info(`api escutando na porta ${port}`))