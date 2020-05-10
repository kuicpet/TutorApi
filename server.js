const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const routes = require('./routes/route');
const cors = require("cors");
require('dotenv').config();


const app = express();                // express app
const url = process.env.MONGO_URI;    // connection string


// set up mongoose connection to database
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to Database");
}).catch((error) => {
    console.log("Failed to Connect to Database");
    console.log(error);
});




app.use(express.json());                                // express to use json
app.use(cors());                                        // handling cors errors
app.use(bodyParser.json());                             // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: false}));      // parse requests of content-type - application/x-www-form-urlencoded

app.use(async (req,res,next) => {
    if(req.headers["x-access-token"]){
        const accessToken = req.headers["x-access-token"];
        const { userId, exp} = await jwt.verify(accessToken,process.env.JWT_SECRET);
        //Checking if token is expired
        if(exp < Date.now().valueOf()/1000){
            return res.status(401).json({
                error: "token is expired.please login to obtain new one"
            });
        }
        res.locals.loggedInuser = await User.findById(userId);
        next();
    } else {
        next();
    }
});
app.use('/api/v1/',routes);
// sample test route 
app.get('/api/v1',(req,res) => {
    res.json({
        message: "Welcome to Tutor Api!"
    });
});

// set port,listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
