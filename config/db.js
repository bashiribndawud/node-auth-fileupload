const {Sequelize} = require('sequelize');

const createDB = new Sequelize("mydb", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const connectDB = () => {
    createDB.sync().then(() => {
        console.log('Connected to Database')
    })
    .catch((err) => {
        console.log('Connection failed', err)
    })
}


module.exports = { connectDB, createDB };