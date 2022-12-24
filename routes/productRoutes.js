const express = require("express");
const router = express.Router();
const { isAuthenticated, isSeller, isBuyer } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");
const Product = require("../models/productModel");
const orderModel = require("../models/orderModels");
const { stripeKey } = require("../config/credentials");
const OrderModel = require("../models/orderModels");
const stripe = require("stripe")(stripeKey);
const { WebhookClient } = require("discord.js");

const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1055253034671808584/mYdizbxadq_y-MnTUuojAknR1-JWJpsGeog3pbuHA-2Fslmv2O-WRT8RS0rplH9QHZAS",
});

router.post("/create", isAuthenticated, isSeller, async (req, res) => {
    try {
        upload(req, res, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          const { name, price } = req.body;
          if (!name || !price || !req.file) {
            return res.status(400).json({ err: "require all fields" });
          }

          if (Number.isNaN(price)) {
            return res.status(400).json({ err: "price should be a number" });
          }

          let productDetail = {
            name,
            price,
            content: req.file.path,
          };

          const savedProduct = await Product.create(productDetail);

          return res.status(200).json({
            status: "OK",
            savedProduct,
          });
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

router.get("/get/all", isAuthenticated, async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    console.log('Product', allProducts)
    if (!allProducts) {
      return res.status(404).json({
       message: "Products not found"
      });
    }
    return res.status(200).json({allProducts})
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

router.get("/buy/:productId", isAuthenticated, isBuyer, async (req, res) => {
  const { id } = req.user;
  try {
    const { productId } = req.params;
    const productFind = await Product.findOne({ where: { id: productId } });
    if (!productFind) {
      return res
        .status(404)
        .json({ message: `Product with Id: ${productId} not found` });
    }

    const orderDetails = {
      productId,
      userId: id,
    };
    // let paymentMethod = await stripe.paymentMethod.create({
    //   type: "card",
    //   card: {
    //     number: "3782618712919567",
    //     exp_month: 9,
    //     exp_year: 2023,
    //     cvc: "321",
    //   },
    // });

    // let paymentIntent = await stripe.paymentIntents.create({
    //   amount: product.price,
    //   current: "NGN",
    //   payment_method_types: ["card"],
    //   payment_method: paymentMethod.id,
    //   confirm: true,
    // });

    // if (paymentIntent) {
    //   const createOrder = await OrderModel.create(orderDetails);
    //   webhook.send({
    //     content: `I am sending order with id: ${createOrder}`,
    //     username: "Captain",
    //     avatarURL:
    //       "https://www.google.com/imgres?imgurl=https%3A%2F%2Flagmall.com.ng%2Fwp-content%2Fuploads%2F2021%2F01%2Fbrown-gucci-hand-bag-300x300.jpg&imgrefurl=https%3A%2F%2Flagmall.com.ng%2Fmarket%2Fgucci-female-hand-bag-brown%2F&tbnid=5fcQCkXt12ZmdM&vet=12ahUKEwj8tbXGyYv8AhUKkRoKHUbLDDIQMygGegUIARC7Ag..i&docid=jcvBloq6wGgHjM&w=300&h=300&q=bag&ved=2ahUKEwj8tbXGyYv8AhUKkRoKHUbLDDIQMygGegUIARC7Ag",
    //   });
    //   return res.status(200).json({
    //     createOrder,
    //   });
    // } else {
    //   return res.status(400).json({
    //     err: "Payment Failed",
    //   });
    // }
    webhook.send({
      content: `This is my order product ${productFind.dataValues}`,
      username: "Captain",
      avatarURL:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Flagmall.com.ng%2Fwp-content%2Fuploads%2F2021%2F01%2Fbrown-gucci-hand-bag-300x300.jpg&imgrefurl=https%3A%2F%2Flagmall.com.ng%2Fmarket%2Fgucci-female-hand-bag-brown%2F&tbnid=5fcQCkXt12ZmdM&vet=12ahUKEwj8tbXGyYv8AhUKkRoKHUbLDDIQMygGegUIARC7Ag..i&docid=jcvBloq6wGgHjM&w=300&h=300&q=bag&ved=2ahUKEwj8tbXGyYv8AhUKkRoKHUbLDDIQMygGegUIARC7Ag",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = router;
