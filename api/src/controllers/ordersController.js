const { Router } = require('express')
const routes = Router()
const { QueryTypes, Sequelize } = require('sequelize');
const dbConnect = require('../services/database')

routes.get('/',async (req,res,next) => {
    /* 
        #swagger.tags = ['Orders']
        #swagger.description = 'Retorna todas as `order` com o respectivo objeto `provider` associado'
        #swagger.responses[200] = { 
            description: 'Retorna todos os objetos da tabela' 
        }
    */
        
    try {
        const database = await dbConnect()
        const orders = await database.query(`
            SELECT orders.*, cnpjs.cnpj,buyers.name AS buyerName FROM orders
            LEFT JOIN cnpjs ON (cnpjs.id = orders.cnpjId)
            LEFT JOIN buyers ON (buyers.id = orders.buyerId)`, 
            { type: QueryTypes.SELECT }
        );

        /* 
        A solução mais adequada para recuperar os rótulos dos status seria um JOIN com uma tabela de referencia.
        Optei por utilizar um array direto no código para recuperar o rótulo dos status pois alterar a estrutura do banco com 
        uma tabela e relacionamentos adicioanis está alem do escopo da API, em um cenário real, sugeriria que fosse
        conversado com DBA a posibilidade de se criar esta tabela, para manter a responsabilidade de armazenar informação dentro do 
        banco de dados e garantir a SSOT.
        */

        const orderStatusBuyerLabel = [
            'Pendente de confirmação', 
            'Pedido confirmado', 
            'Não reconhece o pedido', 
            'Mercadoria não recebida', 
            'Recebida com avaria', 
            'Devolvida', 
            'Recebida com devolução parcial', 
            'Recebida e confirmada', 
            'Pagamento Autorizado'
        ]
        orders.map(order => {
            order.orderStatusBuyerLabel = orderStatusBuyerLabel[order.orderStatusBuyer]
            return order
        })

        for (let order of orders) {
            const provider = await database.query(`
                SELECT providers.*,cnpjs.cnpj,cnpjs.companyType 
                FROM providers 
                INNER JOIN cnpjs 
                ON (providers.cnpjId= cnpjs.id) 
                WHERE providers.id=${order.providerId};`,
                { type: QueryTypes.SELECT }
            );
            order.provider = provider[0]
        }

        database.close()
        logger.info('Consulta realizada com sucesso')
        res.status(200).send({ok:true,mensagem:null,retorno:orders})
    } catch (err) {
        logger.error(err)
        res.status(500).send({ok:false,mensagem:'Algo deu errado, tente novamente mais tarde',retorno:null})
    }
})

module.exports = routes