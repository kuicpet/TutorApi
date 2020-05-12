const { Lesson } = require('../models/lessonModel');


//Create a lesson
exports.createLesson = (req,res,next) => {
    try {
        const { title, subject } = req.body;
        let newLesson = await Lesson.findOne({title});
        if(newLesson) throw new Error('Lesson already Exists!');
        newLesson = new Lesson({title,subject});
        await newLesson.save();
        res.status(200).json({
            messsage: "New Lesson created!",
            data: newLesson,
        })
    } catch (error) {
        next(error);
    }
}
//Get all lessons
exports.getLessons = (req,res,next) => {
    try {
        const lessons = Lesson.find({}).populate('subjects').execPopulate();
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
        const lesson = await Lesson.find({lessonId}).populate('subject').execPopulate();
        if(!lesson) return next(new Error("Lesson does not Exist!"))
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