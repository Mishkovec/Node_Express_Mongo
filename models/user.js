const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        reqired: true
    },
    name: {
        type: String,
        reqired: true
    },
    cart: {
        items: [{
            count: {
                type: Number,
                requred: true,
                default: 1
            },
            courseId: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        }, ]
    }
})

module.exports = model('User', userSchema)