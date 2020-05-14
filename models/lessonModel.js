const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Subject'
        }
    ]
   

},{timestamps: true})
const Lesson = mongoose.model('lesson',LessonSchema);
module.exports = Lesson;