const { Subject } = require('../models/subjectModel');



//Create a Subject by Id
exports.createSubject = async (req,res,next) => {
    try {
        const { name,category } = req.body;
        let newSubject = await Subject.findOne(name);
        if(newSubject) throw new Error("Subject already Exists!");
        newSubject = new Subject({ name,category });
        await newSubject.save();
        res.status(200).json({
            message: "New Subject Created!",
            data: newSubject
        });
    } catch (error) {
        next(error);
    }
}
//Get all Subjects
exports.getSubjects =  async(req,res,next) => {
    try {
        const subjects = await Subject.find({}).populate('lessons').execPopulate();
            res.status(200).json({
                data: subjects
            })
    } catch (error) {
        next(error);
    }
}
//Get a Subject by Id
exports.getSubject = async (req,res,next) => {
    try {
        const subjectId = req.params.subjectId;
        const subject = await Subject.find({subjectId}).populate('lessons').execPopulate();
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
exports.getSubjectName = async (req,res,next) => {
    try {
        const subjectName = req.body.name;
        const sortname= {subjectName: 1}
        const subject = await Subject.find({subjectName}).sort(sortname).toArray((err,res) => {
            if(err) throw err;
        })
        if(!subject){
            return next(new Error("Subject name does not exists!"));
        }
        res.status(200).json({
            data:subjectName
        })
    } catch (error) {
        next(error);
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