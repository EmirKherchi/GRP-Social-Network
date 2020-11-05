//Imports

const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = "fAM6zvYJ3uK?6xEyUaJ-Yqu%FL9G34";
const models = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
    const user = await models.Users.findOne({
      where: {
        id: decodedToken.id,
      },
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate" });
  }
};
