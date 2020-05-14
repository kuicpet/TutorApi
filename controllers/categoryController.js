const  Category  = require('../models/categoryModel');

//Create a Category
exports.createCategory = async (req,res,next) => {
    try {
        const { name,level } = req.body;
        let newCategory = await Category.findOne({name});
        if(newCategory) return next(new Error("Category already Exists!"));
        newCategory = new Category({name,level: level || "pri" });
        await newCategory.save();
        res.status(200).json({
            message:"Category Created Successfully!",
            data: newCategory
        })
    } catch (error) {
        next(error);
    }
}
//Get all Categories
exports.getCategories = async (req,res,next) => {
    try {
        const categories = await Category.find({}).populate('subjects');
        res.status(200).json({
            data: categories
        })
    } catch (error) {
        next(error);
    }
}
//Get a Category by Id
exports.getCategory = async (req,res,next) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.find({categoryId}).populate('sunject');
        if(!category) return next(new Error("No such Category Exists!"));
        res.status(200).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}
//Update a Category
exports.updateCategory = async (req,res,next) => {
    try {
        const update = req.body;
        const categoryId = req.params.categoryId;
        await Category.findByIdAndUpdate({categoryId,update});
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
        await Category.findByIdAndDelete({categoryId});
        res.status(200).json({
            data: null,
            message: "Category successfully Deleted!"
        })
    } catch (error) {
        next(error);
    }
}