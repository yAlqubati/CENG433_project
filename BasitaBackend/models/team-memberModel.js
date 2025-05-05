const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teamMemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: String,
    },
    github: {
        type: String,
    },
    orderOfDisplay: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const teamMembers = mongoose.model('TeamMember', teamMemberSchema, 'teamMembers');
module.exports = teamMembers;
