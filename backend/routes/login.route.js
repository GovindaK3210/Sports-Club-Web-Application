const express = require('express');
const app = express();

const loginRoute = express.Router();

let User = require('../models/User');


const jwt = require('jsonwebtoken');
const fs = require("fs");


const RSA_PRIVATE_KEY = fs.readFileSync('./JWT_KEY/jwtRS256.key');


        
    

loginRoute.route('/').post((req, res,next) => {
    User.findOne({ email: req.body.email }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        
        if(data!=null){
            console.log("DB pass: ",data.password);
        console.log("User pass: ",req.body.password);

        if(data.password==req.body.password)
        {


            const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 120,
                    subject: data._id.toString()
                });

            
            
           
            //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
            res.status(200).json({
                idToken: jwtBearerToken, 
                expiresIn: 120
              });
            
        }
        else
        {
            var err = new Error();
            err.statusCode = 401;
            err.message = "Incorrect password!";
            return next(err);
        }

        }

        else
        {
            var err = new Error();
            err.statusCode = 401;
            err.message = "Incorrect email!";
            return next(err);
        }
        
        
      }
    })
  })
 
  module.exports = loginRoute;