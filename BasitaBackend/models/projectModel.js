const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    briefDescription: {
        type: String,
        required: true,
    },
    detailedDescription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    lang:{
        type: String,
        required: true,
    },
    orderOfDisplay: {
        type: Number,
        required: true,
    },
}, { timestamps: true });


const projects = mongoose.model('Project', projectSchema, 'projects');
module.exports = projects;