const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const path = require("path");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const PORT = process.env.PORT;

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Photo Store API",
      version: "1.0.0",
      description: "Buy/Sell Photos",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
});



// middlewares
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.use(express.static(path.join(__dirname, "/content")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
  connectDB();
});
