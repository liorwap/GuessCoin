const {check} = require('express-validator')

exports.userSignUpValidator = [
    // check('username')
    //     .not()
    //     .isEmpty()
    //     .isLength({min: 5})
    //     .withMessage('username is required'),
    check('email')
        .isEmail()
        .withMessage('must enter valid email'),
    check('password')
        .isLength({min:6})
        .withMessage('enter at least 6 characters')
];
exports.userLoginValidator = [
    check('email')
        .isEmail()
        .withMessage('must enter valid email'),
    check('password')
        .isLength({min:6})
        .withMessage('enter at least 6 characters')
];