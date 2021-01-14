const { Router } = require('express')
const routes = Router()
const { QueryTypes, Sequelize } = require('sequelize');
const dbConnect = require('../services/database')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

routes.post('/',async (req,res,next) => {
    /* 
        #swagger.tags = ['Auth']
        #swagger.description = 'Verifica se um usuário existe e retorna um token caso ele exista'
        #swagger.parameters['email'] = { 
            description: 'E-mail do usuário',
            in:'body',
            required:true,
            type:'string',
            schema: {
                    $email: "allan@cashforce.com.br"
            }
        }
        #swagger.responses[200] = { 
            description: 'Retorna o token do usuário que deve ser usado para requisições futuras' 
        }
    */
        
    try {
        const database = await dbConnect()
        const user = await database.query(`
            SELECT * FROM users
            WHERE email = '${req.body.email}' 
            `, 
            { type: QueryTypes.SELECT }
        );
        database.close()
          
        if (user[0]) {
            logger.info('Token gerado para o usuário:', user[0].email)
            const token = jwt.sign(user[0].id,secret)
            res.status(200).send({ok:true,mensagem:null,retorno:token})
        } else {
            logger.info('Tentativa de autenticação sem sucesso:', req.body.email)
            res.status(401).send({ok:false,retorno:null,mensagem:'Não autorizado'})
        }

    } catch (err) {
        logger.error(err)
        res.status(500).send({ok:false,mensagem:'Algo deu errado, tente novamente mais tarde',retorno:null})
    }
})

module.exports = routes