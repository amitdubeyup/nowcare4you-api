var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Users', new Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true,
    collection: 'Users'
}));