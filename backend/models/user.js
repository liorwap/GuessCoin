const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    // username: {
    //     Type: String,
    //     trim : true,
    //     required : true,
    //     unique: true,
    //     max: 32,
    //     min: 3,
    //     index: true,
    //     lowercase: true
    // },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
    },
    {timestamps: true}
);
userSchema
    .virtual('password')
    .set(function (password){
        //temp variable
        this._password = password
        this.salt = this.makeSalt()
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function (){
        return this._password
    });


userSchema.methods = {
    authenticate: function (plainPassword){
        return this.encryptPassword(plainPassword) === this.hashedPassword
    },

    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err){
            return ''
        }
    },

    makeSalt: function (){
        return Math.round(new Date().valueOf() * Math.random()).toString()
    }
};
module.exports = mongoose.model('User', userSchema);