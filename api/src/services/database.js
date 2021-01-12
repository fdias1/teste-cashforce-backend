const { Sequelize } = require('sequelize')
const { Logger } = require('simple-node-logger')

const dbEngine = process.env.DB_ENGINE
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

var tentativasDeConexao = 1

const connect = async () => {
    try {
        const sequelize = new Sequelize(dbName, username, password, {
            host: dbHost,
            dialect: dbEngine,
            logging: false
        });
        return sequelize
    } catch(err) {
        if (tentativasDeConexao <= 3) {
            logger.info(`Tentativa ${tentativasDeConexao}/3 de conexão falhou! tentando novamente em 5 segundos...`)
            tentativasDeConexao++
            setTimeout(() => connect(),5000)
        } else {
            logger.error(`falha ao conectar com o banco de dados: ${err}`)
        }
    } 
}

module.exports = connect