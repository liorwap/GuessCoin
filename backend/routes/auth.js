const express = require('express')
const router = express.Router()
const {signup, login, logout, requireLogin} = require('../controllers/auth')

// validators
const {runValidation} = require('../validators')
const {userSignUpValidator, userLoginValidator} = require('../validators/auth')

router.post('/signup',userSignUpValidator, runValidation,  signup);
router.post('/login',userLoginValidator, runValidation,  login);
router.get('/logout',logout);


//route protected by login example:
router.get('/secret',requireLogin, (req, res) => {
    res.json({
        message: "You got access here"
    });
});

module.exports = router
