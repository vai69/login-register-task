const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const userSchema = require("../handler/DataBaseModel/UserSchema");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

verified = (req, res, next) => {
    userSchema.find({_id: req.user.id}).then(user => {
    
        if (user.verified === true) {
          return true;
        } else {
        
            return false;
        }
  });
};


const authJwt = {
  verifyToken: verifyToken,
  verified: verified,
};
module.exports = authJwt;