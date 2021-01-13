const { Router } = require('express')
const routes = Router()
const { QueryTypes } = require('sequelize');
const dbConnect = require('../services/database')

routes.get('/:id',async (req,res,next) => {
    try {
        const id = parseInt(req.params.id)
        const database = await dbConnect()
        const provider = await database.query(`SELECT providers.*,cnpjs.cnpj,cnpjs.companyType FROM providers INNER JOIN cnpjs ON (providers.cnpjId= cnpjs.id) WHERE providers.id=${id};`, { type: QueryTypes.SELECT });
        database.close()
        res.status(200).send({ok:true,mensagem:null,retorno:provider[0] || []})
    } catch (err) {
        res.status(400).send({ok:false,mensagem:err,retorno:null})
    }
})

module.exports = routes