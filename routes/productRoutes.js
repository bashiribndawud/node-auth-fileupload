const express = require('express');
const router = express.Router();
const {isAuthenticated, isSeller} = require('../middlewares/auth')
const upload = require('../utils/fileUpload')

router.post('/create', isAuthenticated, isSeller, async(req, res) => {
    upload(req, res, async (err) => {
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        const {name, price} = req.body;
        if(!name || !price || !req.file){
            return res.status(400).json({err: "require all fields"})
        }

        if(Number.isNaN(price)){
            return res.status(400).json({ err: "price should be a number" });
        }

        let productDetail = {
            name, 
            price,
            content: req.file.path
        }

        return res.status(200).json({
            status: "OK",
            productDetail
        })
    })
})


module.exports = router