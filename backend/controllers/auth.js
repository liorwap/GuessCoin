const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    User.findOne({email:req.body.email})
        .exec((err, user) => {
        if(user){
            return res.status(400).json({
                error: 'Email already exists'
            })
        } else {
            const {email, password} = req.body;
            let newUser = new User({email:email, password})
            newUser.save((err, user) => {
                if(err){
                    return res.status(400).json({
                        error: err
                    })
                }
                return res.json({
                    message: "Signup success! Please login."
                })
            })
        }
    })
};

exports.login = (req, res) => {
    const {email, password} = req.body
    // check if user signed up
    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error:"User does not exist. Please signup"
            })
        }
        // authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"Incorrect password"
            })
        }
        //generate token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.cookie('token', token ,{expiresIn:'1h'})

        const {_id, email} = user


        return res.json({
            token,
            user: {_id, email}
        })
    })
};

exports.logout = (req, res) =>{
    res.clearCookie('token')
    res.json({
        message: "Successfully signed out"
    })
};

//todo fix the environment variable secret
//protect routes middleware
exports.requireLogin = expressJwt({
    secret: "process.env.JWT_SECRET",
    algorithms:['RS256']
});