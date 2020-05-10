const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function hashPassword(password){
    return await bcrypt.hash(password,10);
}
async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword,hashedPassword);
}

//User SignUp logic
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

//User Sign logic
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
//Get all Users
exports.getUsers = async (req,res,next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

//get a User by Id
exports.getUser = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user) return next(new Error("User does not Exist!"));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
}

// Update a User
exports.updateUser = async (req,res,next) => {
    try {
        const update = req.body;
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId,update);
        const user = await User.findById(userId);
        res.status(200).json({
            data: user,
            message: "User has been Updated!"
        });
    } catch (error) {
        next(error)
    }
}

// Delete a User
exports.deleteUser = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: "User has been Deleted!"
        })
    } catch (error) {
        next(error)
    }
}

// Access Control for Users
exports.grantAcces = function(action, resource){
    return async (req,res,next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if(!permission.granted){
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

//Access for Logged In Users
exports.allowIfLoggedIn = async (req,res,next) => {
    try {
        const user = res.locals.loggedInUser;
        if(!user)
        return res.status(401).json({
            error: "You need to be logged in to access this route"
        });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}