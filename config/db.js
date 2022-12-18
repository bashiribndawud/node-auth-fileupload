const {Sequelize} = require('sequelize');

const createDB = new Sequelize('mydb', 'user', 'pass', {
    dialect: 'sqlite',
    host: './config/db.sqlite'
})

const connectDB = () => {
    createDB.sync().then(() => {
        console.log('Connected to Database')
    })
    .catch((err) => {
        console.log('Connection failed', err)
    })
}


module.exports = { connectDB, createDB };