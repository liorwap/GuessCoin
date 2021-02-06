const mongoose = require('mongoose')
const crypto = require('crypto');
const User = require('./user');

const gameActionSchema = new mongoose.Schema(
    {
        user: {
            type: User,
            required: false // NOTE: for now, I want to allow guess actions without user.
        },
        guessValue: {
            type: Number,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

gameActionSchema.virtual('userObjectID')
    .set(function (userObjectID) {
        this._userObjectID = userObjectID;
        User.findById(self._userObjectID, function (err, user) {
            if (user) {
                self.user = user;
            }
        }).exec();
    })
    .get(function () {
        return this._userObjectID;
    });

module.exports = mongoose.model('GameAction', gameActionSchema);