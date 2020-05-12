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
        const lessons = Lesson.find({});
        res.json({
            data: lessons
        })
    } catch (error) {
        next(error);
    }
}
//Get lesson by Id
exports.getLesson = (req,res,next) => {
    try {
        const lessonId = req.params.lessonId;
        const lesson = await Lesson.find({lessonId});
        if(!lesson) return next(new Error("Lesson does not Exists"));
        res.status(200).json({
            data: lesson
        })
    } catch (error) {
        next(error);
    }
}
//Update lesson by Id
exports.updateLesson = (req,res,next) => {
    try {
        const update = req.body;
        const lessonId = req.params.lessonId;
        await Lesson.findByIdAndUpdate(lessonId,update,{ useFindAndModify: false});
        const lesson = await Lesson.findById(lessonId);
        res.status(200).json({
            data: lesson,
            messsage: "Lesson Updated Successfully!"
        })
    } catch (error) {
        next(error);
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