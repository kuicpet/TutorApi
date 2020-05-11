const { Lesson } = require('../models/lessonModel');


//Create a lesson
exports.createLesson = (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Get all lessons
exports.getLessons = (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Get lesson by Id
exports.getLesson = (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Update lesson by Id
exports.updateLesson = (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Delete lesson by Id
exports.deleteLesson = async (req,res,next) => {
    try {
        const lessonId = req.params.lessonId;
        await Lesson.findByIdAndDelete({lessonId});
        res.status(200).json({
            data: null,
            messsage: "Lesson successfully Deleted!"
        })
    } catch (error) {
        next(error);
    }
};