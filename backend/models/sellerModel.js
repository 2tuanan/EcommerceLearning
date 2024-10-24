const {Schema, model} = require('mongoose');

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'seller'
    },
    status: {
        type: Boolean,
        default: 'pending'
    },
    payment: {
        type: Boolean,
        default: 'inactive'
    },
    method: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: ''
    },
    shopInfo: {
        type: Object,
        required: {}
    }
}, {timestamps: true})

module.exports = model('sellers', sellerSchema)