const express  = require('express');
const app = express();
const {connectDB} = require('./config/db')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
//database connect


// middlewares
app.use(express.static(path.join(__dirname, '/content')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = 1338;

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/product', productRoutes)



app.listen(PORT, () => {
    console.log('server is running ')
    connectDB();
})