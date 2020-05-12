const { Category } = require('../models/categoryModel');

//Create a Category
exports.createCategory = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Get a Category
exports.getCategory = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Update a Category
exports.updateCategory = async (req,res,next) => {
    try {
        const update = req.body;
        const categoryId = req.params.categoryId;
        await Category.findByIdAndUpdate(categoryId,update,{ useFindAndModify : false});
        const category = await Category.findById(categoryId);
        res.status(200).json({
            data: category,
            message: "Category Updated Successfully!"
        });
    } catch (error) {
        next(error);
    }
}
//Delete a Category
exports.deleteCategory = async (req,res,next) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({
            data: null,
            message: "Category successfully Deleted!"
        })
    } catch (error) {
        next(error);
    }
}