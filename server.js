const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();


const app = express();
const url = process.env.MONGO_URI;    // connection string


// set up mongoose connection to database
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to Database");
}).catch((error) => {
    console.log("Failed to Connect to Database");
    console.log(error);
});




app.use(express.json());
app.use(cors());                                        // handling cors errors
app.use(bodyParser.json());                             // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: false}));      // parse requests of content-type - application/x-www-form-urlencoded


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
