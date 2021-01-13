const { Router } = require('express')
const routes = Router()
const { QueryTypes, Sequelize } = require('sequelize');
const dbConnect = require('../services/database')

routes.get('/',async (req,res,next) => {
    try {
        const database = await dbConnect()
        const orders = await database.query("SELECT * FROM `orders`", { type: QueryTypes.SELECT });
        database.close()
        res.status(200).send({ok:true,mensagem:null,retorno:orders})
    } catch (err) {
        res.status(400).send({ok:false,mensagem:err,retorno:null})
    }
})

module.exports = routes