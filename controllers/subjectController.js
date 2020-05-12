const { Subject } = require('../models/subjectModel');



//Create a Subject by Id
exports.createSubject = (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Get all Subjects
exports.getSubjects = (req,res,next) => {
    try {
        const subjects = await Subject.find({});
            res.status(200).json({
                data: subjects
            })
    } catch (error) {
        next(error);
    }
}
//Get a Subject by Id
exports.getSubject = (req,res,next) => {
    try {
        const subjectId = req.params.subjectId;
        const subject = await Subject.find({subjectId});
        if(!subject){
            return next(new Error("Subject does not Exists!"));
        }
        res.status(200).json({
            data: subject
        })
    } catch (error) {
        next(error);
    }
}
//Get a Subject by Name (ascending order)
exports.getSubjectName = (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Update a Subject by Id
exports.updateSubject = async (req,res,next) => {
    try {
        const update = req.body;
        const subjectId = req.params.subjectId;
        await Subject.findByIdAndUpdate(subjectId,update,{ useFindAndModify: false});
        const subject = await Subject.findByid(subjectId);
        res.status(200).json({
            data: subject,
            message: "Subject Updated Successfully!"
        })
    } catch (error) {
        next(error);
    }
}
//Delete a Subject by Id
exports.deleteSubject = async (req,res,next) => {
    try {
        const subjectId = req.params.subjectId;
        await Subject.findByIdAndDelete(subjectId);
        res.ststus(200).json({
            data:null,
            message: "Subject successfully Deleted!"
        })
    } catch (error) {
        next(error);
    }
}