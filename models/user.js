const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 15;

const userSchema = new Schema({
    mail: { type: String, unique: true },
    password: String,
});

userSchema.pre('save', function (next) {
    
    if (this.isNew || this.isModified("password")) {

        bcrypt.hash(this.password, saltRounds).then((hash) => {

            this.password = hash;
            next();

        }, next);

    } else next();
    
});

module.exports = mongoose.model('User', userSchema);