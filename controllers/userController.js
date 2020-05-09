const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function hashPassword(password){
    return await bcrypt.hash(password,10);
}
async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword,hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        if(!email || !password || !name ){
            res.status(400).json({
                status: false,
                message: "All Fields are Required!"
            });
            return;
        }
        User.findOne({ email }).then((user) => {
            if(user){
                return res.json({
                    status: false,
                    message: "This Email Already exists!"
                });
            } else {
                const hashedPassword = await hashPassword(password);
                const newUser = new User({name,email,password,hashedPassword,role: role || "student" });
                const accessToken = jwt.sign({ userId: newUser._id},process.env.JWT_SECRET,{
                    expiresIn: "1d"
                });
                newUser.accessToken = accessToken;
                await newUser.save();
                res.json({
                    status: true,
                    message: "User SignUp successful!",
                    data: newUser,
                    accessToken
                });
            };
        });
       
    } catch (error) {
        next(error)
    }
}

exports.signin = async (req, res, next) => {
    try {
       const { email, password } = req.body;
       const user = await User.findOne({ email });
       if( !user ) return 
       next(new Error("Email does not Exist!"));
       const validPassword = await validatePassword( password, user.password );
       if(!validPassword ) return next(new Error("Password is not correct!"))
       const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{
            expiresIn: "1d"
       });
       await User.findOneAndUpdate(user._id, { accessToken })
       res.status(200).json({
           message: "User SignIn successful!",
           data: { email: user.email, role: user.role },
           accessToken
       });
    } catch (error) {
        next(error);
    }
}