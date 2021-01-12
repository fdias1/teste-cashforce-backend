if (process.env.NODE_ENV !== 'PRD') require('dotenv').config()
global.logger = require('simple-node-logger').createSimpleLogger('logs/api.log')

const port = process.env.PORT
const cors = require('cors')
const express = require('express')
const app = express()
const v1 = require('./src/routes/v1.js')

app.use(express.json())
app.use(cors({origin:true}))

// versões da API
app.use('/v1',v1)

app.listen(port,() => logger.info(`api escutando na porta ${port}`))