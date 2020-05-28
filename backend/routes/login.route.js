const express = require("express");
const app = express();

const loginRoute = express.Router();

let User = require("../models/User");

const jwt = require("jsonwebtoken");
const fs = require("fs");

const RSA_PRIVATE_KEY = fs.readFileSync("./JWT_KEY/jwtRS256.key");

loginRoute.route("/").post((req, res, next) => {
  User.findOne({ email: req.body.email }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data != null) {
        if (data.password == req.body.password) {
          const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 600,
            subject: data._id.toString(),
          });

          //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
          res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 600,
            user_id: data._id,
            user_name: data.name,
            user_email: data.email,
            user_role: data.role,
          });
        } else {
          var err = new Error();
          err.statusCode = 401;
          err.message = "Incorrect password!";
          return next(err);
        }
      } else {
        var err = new Error();
        err.statusCode = 401;
        err.message = "Incorrect email!";
        return next(err);
      }
    }
  });
});

module.exports = loginRoute;
