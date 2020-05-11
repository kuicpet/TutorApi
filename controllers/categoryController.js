const { Category } = require('../models/categoryModel');

//Create a Category
exports.createCategory = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Read a Category
exports.getCategory = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
//Update a Category
exports.updateCategory = async (req,res,next) => {
    try {
        
    } catch (error) {
        
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