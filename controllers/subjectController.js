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
        
    } catch (error) {
        
    }
}
//Get a Subject by Id
exports.getSubject = (req,res,next) => {
    try {
        
    } catch (error) {
        
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
        
    } catch (error) {
        
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