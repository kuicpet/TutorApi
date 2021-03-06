const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level:[
        {
            type: String,
            default: "Pri",
            enum: ["pri","jss","sss"]
        }
    ],
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ]

},{timestamps: true})
const Category = mongoose.model('category',CategorySchema);
module.exports = Category;