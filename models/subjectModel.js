const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
    ],
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        }
    ]

},{timestamps: true})
const Subject = mongoose.model('subject',SubjectSchema);
module.exports = Subject;