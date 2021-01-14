const jwt = require('jsonwebtoken')
const { Logger } = require('simple-node-logger')
const secret = process.env.JWT_SECRET

jwtCheck = async (req,res,next) => {
    /*
    #swagger.parameters['token'] = {
        in: 'header',
        description: 'Token de acesso da API',
        type: 'string',
    }
    */
    const verify = token => {
        try {
            return jwt.verify(token,secret)
        } catch {
            return null
        }
    }

    const tokenCheck = verify(req.headers.token)
    if (tokenCheck) {
        logger.info('Requisição recebida, userId: ',tokenCheck)
        next()
    } else {
        res.status(401).send({ok:false,mensagem:'Não autorizado',retorno:null})
    }
}

module.exports = jwtCheck