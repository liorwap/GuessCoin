const {validationResult} = require('express-validator/check')

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({error: errors.array()[0].msg}); //return the very first error msg there is
    }
    next();
};