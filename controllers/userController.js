const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




async function hashPassword(password){
    return await bcrypt.hash(password,10);
}


//User SignUp logic
exports.signUp = async (req, res, next) => {
    try {
     const { name,email, password, role } = req.body;
     let newUser = await User.findOne({email});
     if(newUser){ throw new Error("Email already Exists!");
     }
     const hashedPassword = await hashPassword(password);
     newUser = new User({ name,email, password: hashedPassword, role});
     const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     newUser.accessToken = accessToken;
     await newUser.save();
     res.json({
      message: "User Signup Successful!",
      data: newUser,
      accessToken
     })
    } catch (error) {
     next(error)
    }
   }
    
//User Sign logic
exports.signIn = async (req, res, next) => {
   const { email,password} = req.body;
   try {
       let user = await User.findOne({ email });
       if(!user)
        return res.status(400).json({
            message: "User Not Exists"
        });
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) 
            return res.status(400).json({
                message: 'Incorrect Password!'
            });
        const payload = {
            users: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        ),
        (err,accessToken) => {
            if(err) throw err;
            res.status(200).json({
                accessToken
            });
        }
       
   } catch (error) {
       next(error);
   }
    
}
//Get all Tutors
exports.getTutors = async (req,res,next) => {
    const tutors = await User.find({role: "tutor"});
    res.status(200).json({
        data: tutors
    });
    next();
}
//get Tutor by Id
exports.getTutor = async (req,res,next) => {
    try {
        const tutorId = req.params.tutorId;
        const tutor = await User.findById({tutorId,role: "tutor"});
        res.status(200).json({
            data: tutor
        })
    } catch (error) {
        next(error);
    }
}
//Get Tutor by Name (asc)
exports.getTutorName = async (req,res,next) => {
    try {
        const tutorName = req.body.tutorName;
        const sortName = {name: 1};
        const tutor = await User.find({tutorName}).sort(sortName);
         if(!tutor){
             return next(new Error("Tutor does not Exist!"));
         }
         res.status(200).json({
             data: tutorName
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
    next();
}

//get a User by Id
exports.getUser = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById({userId});
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
        await User.findByIdAndUpdate({userId,update});
        const user = await User.findById(userId);
        res.status(200).json({
            data: user,
            message: "User has been Updated!"
        });
    } catch (error) {
        next(error)
    }
}
//Delete a Tutor
exports.deleteTutor = async (req,res,next) => {
    try {
        const tutorId = req.params.tutorId;
        await User.findByIdAndDelete({tutorId});
        res.status(200).json({
            data: null,
            message: "Tutor successfully deactivated!"
        })
    } catch (error) {
        next(error);
    }
}
// Delete a User
exports.deleteUser = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete({userId});
        res.status(200).json({
            data: null,
            message: "User has been Deleted!"
        })
    } catch (error) {
        next(error)
    }
}

// Access Control for Users
exports.authorize = function authorize(roles = []){
    if(typeof roles === 'string'){
        roles = [roles];
    }
    return [
        async (req,res,next) => {
            try {
                const user = await User.findById(req.user.id);
            if(!user || (roles.length && !roles.includes(user.role))){
                return res.status(401).json({
                    message: 'unauthorized'
                });
            }
            req.user.role = user.role;
            next();
            } catch (error) {
             next(error);   
            }
            
        }
    ]
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