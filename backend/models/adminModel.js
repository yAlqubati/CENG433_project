const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { 
        type: String, 
        required: true, 
    },
});

adminSchema.pre('save', async function (next) {
    const admin = this;

    if(this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(admin.password, salt);
        admin.password = hash;
    }
    next();

});

adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const admin = mongoose.model('Admin', adminSchema, 'admins');

module.exports = admin;