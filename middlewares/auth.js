const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "authaurization header not found" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "token not found" });
    }
    // returns an object with which we have created the token
    const decoded = jwt.verify(token, "SECRET MESSAGE");
    const user = await User.findOne({ where: { id: decoded.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // extend the req object
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

const isSeller = async (req, res, next) => {
  if(req.user.dataValues.isSeller){
    next();
  }else{
    return res.status(401).json({err: "You are not a seller"})
  }
   
};

module.exports = {isAuthenticated, isSeller}
