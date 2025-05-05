const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName: {
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
        type: String,
        required: true,
    },
}, { timestamps: true });


const services = mongoose.model('Service', serviceSchema, 'services');
module.exports = services;













